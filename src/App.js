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

  useEffect(() => {
    console.log("use effect soinnut:" + soinnut)
    setSointu(satunnainen_sointu(soinnut))
    /*
    const interval = setInterval(() => {
      console.log('This will run every second!');
      setSekunnit(sekunnit => sekunnit + 1);
    }, 1000);
    return () => clearInterval(interval);*/
  }, []);

  useEffect(() => {
    if (soinnut.length == 0) {
      setSointu("Loppu!")
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
        /*
        console.log("oikein!");
        //poistetaan sointu sointu-taulukosta
        console.log("soinnutsize: " + soinnut.length);
        console.log(soinnut);
        setSoinnut([...soinnut.splice(soinnut.indexOf(sointu), 1)]);        
        console.log("soinnusize sitten: " + soinnut.length);
        */
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
        <h1>{sointu}</h1> 
        <h2>{sekunnit}</h2>
        {savelet.slice(0).reverse().map(savel =>
          <div><button type="button" onClick={tallennaSavel} value={savel}>{savel}</button><br /></div>
          )}
        <h2>{vastaus}</h2>
        <h2>{tulos}</h2>
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

