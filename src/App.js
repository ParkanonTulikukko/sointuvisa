import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

function satunnainen_sointu(soinnut) {
  return soinnut[Math.floor(Math.random()*soinnut.length)];
  }

function App() {
  const [ sointu, setSointu] = useState('C');
  const [ vastaus, setVastaus] = useState([]);
  const [ laskuri, setLaskuri] = useState(3);

  const savelet = ["C", "C# Db", "D", "D# Eb", "E", "F", "F# Gb", "G", "G# Ab", "A", "A# Hb Bb", "H B"]

  let tulos = ""

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

  const tallennaSavel = (e) => {
    let vastausTmp =  vastaus
    vastausTmp.push(e.target.value);

    console.log(vastausTmp);
    setVastaus([...vastausTmp]);
    console.log(vastaus)

    setLaskuri(laskuri - 1);
    console.log(laskuri)
    if (laskuri == 1) {
      console.log(vastaus)
      if (oikeatSavelet(collection.get(sointu), vastaus)) {
        console.log("oikein!")
        setSointu(satunnainen_sointu(savelet))
        }
      else {
        console.log("väärin :(")
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

