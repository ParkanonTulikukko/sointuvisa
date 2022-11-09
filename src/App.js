import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

function satunnainen_sointu(soinnut) {
  return soinnut[Math.floor(Math.random()*soinnut.length)];
  }

const savelet = ["C", "C# Db", "D", "D# Eb", "E", "F", "F# Gb", "G", "G# Ab", "A", "A# Hb Bb", "H B"]

function App() {

  //KAI SITÄ PERKULE PITÄÄ PERUTTAA SIIHEN KOHTAAN ETTÄ SAI TON RANDOM SOINTUKIRJAIMEN TOIMIIN

  const collection = new Map();
  collection.set("C", ["C", "E", "G"]);
  collection.set("C# Db", ["C# Db","F","G# Ab"]);
  collection.set("D", ["D","F# Gb","A"]);
  collection.set("D# Eb", ["D# Eb","G","A# Hb Bb"]);
  collection.set("E", ["E","G# Ab","H B"]);
  collection.set("F", ["F","A","C"]);
  collection.set("F# Gb", ["F# Gb","A# Hb Bb","C# Db"]);
  collection.set("G", ["G","H B","D"]);
  collection.set("G# Ab", ["G# Ab","C","D# Eb"]);
  collection.set("A", ["A","C# Db","E"]);
  collection.set("A# Hb Bb", ["A# Hb Bb","D","F"]);
  collection.set("H B", ["H B","D# Eb","F# Gb"]); 

  const [ sointu, setSointu] = useState("");
  const [ vastaus, setVastaus] = useState([]);
  const [ laskuri, setLaskuri] = useState(3);
  const [ tulos, setTulos ] = useState("");
  const [ sekunnit, setSekunnit ] = useState(0);
  const [ soinnut, setSoinnut ] = useState([...savelet])
  const [ kelloKay, setKelloKay ] = useState(true);
  const [ tulokset, setTulokset ] = useState([100,200]);

  useEffect(() => {
    setSointu(satunnainen_sointu(soinnut))
    }, []);

  useEffect(() => {
    let interval;
    if (kelloKay) {
      interval = setInterval(() => {
        console.log('This will run every second!');
        setSekunnit(sekunnit => sekunnit + 1);
        }, 1000);
      }
    else if (!kelloKay) {
      clearInterval(interval);
      }    
    return () => clearInterval(interval);
    }, [kelloKay]);  

  useEffect(() => {
    if (soinnut.length == 0) {
      setSointu("Loppu!");
      setKelloKay(false);
      let tmpTulokset = tulokset;
      tmpTulokset.unshift(sekunnit);
      setTulokset(tmpTulokset);
      }
    else {
      let tmpSointu = satunnainen_sointu(soinnut)
      setSointu(tmpSointu)
      }
    }, [soinnut]);

  const tallennaSavel = (e) => {
    let vastausTmp = vastaus
    vastausTmp.push(e.target.value);

    console.log(vastausTmp);
    setVastaus([...vastausTmp]);
    console.log(vastaus)

    setLaskuri(laskuri - 1);
    console.log(laskuri)
    if (laskuri == 1) {
      if (oikeatSavelet(collection.get(sointu), vastaus)) {
        setTulos("oikein!");
        let tmpSoinnut = [...soinnut];
        tmpSoinnut.splice(soinnut.indexOf(sointu), 1); 
        setSoinnut(tmpSoinnut);
        }
      else {
        console.log("sointuja jälkellä: " + soinnut);
        setTulos("väärin :(");
        setSointu(satunnainen_sointu(soinnut))
        }
      setVastaus([])
      setLaskuri(3)
      }
    }  

  const aloitaAlusta = (e) => { 
    setSoinnut([...savelet]);
    setSekunnit(0);
    setKelloKay(true);
    }

  function oikeatSavelet(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every(element => {
        if (array2.includes(element)) {
          return true;
          }
        return false;
        });
      }
    return false;
    }

  return (
    <div className="App">
      <header className="App-header">
        <h2>{sointu}</h2> 
        <h3>{sekunnit}</h3>
        {tulokset.map(tulos => <span>{tulos}</span>)}
        {savelet.slice(0).reverse().map(savel =>
          <button type="button" onClick={tallennaSavel} value={savel}>{savel}</button>
          )}
        <h2>{vastaus}</h2>
        <h2>{tulos}</h2>
        <button type="button" onClick={aloitaAlusta}>aloita alusta</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

