import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

function satunnainen_sointu(soinnut) {
  return soinnut[Math.floor(Math.random()*soinnut.length)];
  }

const savelet = ["C", "C# Db", "D", "D# Eb", "E", "F", "F# Gb", "G", "G# Ab", "A", "A# Hb Bb", "H B"]

function App() {

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
  const [ tulos, setTulos ] = useState("");
  const [ sekunnit, setSekunnit ] = useState(0);
  const [ aika, setAika ] = useState("0 s");
  const [ soinnut, setSoinnut ] = useState([...savelet])
  const [ kelloKay, setKelloKay ] = useState(true);
  const [ tulokset, setTulokset ] = useState([100,200]);
  const [ valoPaalle, setValoPaalle ] = useState(true);

  useEffect(() => {
    setSointu(satunnainen_sointu(soinnut))
    }, []);

  function sekunnitMinuuteiksi(sekunnit) {
    let minuutit = Math.floor(sekunnit / 60);
    let extrasekunnit = sekunnit % 60;
    minuutit = minuutit < 10 ? "0" + minuutit : minuutit;
    extrasekunnit = extrasekunnit < 10 ? "0" + extrasekunnit : extrasekunnit;
    return minuutit + ":" + extrasekunnit;
    }

  useEffect(() => {
    //console.log(sekunnit);
    setAika(sekunnitMinuuteiksi(sekunnit));
    }, [sekunnit]);  
  
  useEffect(() => {
    let interval;
    if (kelloKay) {
      interval = setInterval(() => {
        //console.log('This will run every second!');
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
      setVastaus([]);
      }
    else {
      let tmpSointu = satunnainen_sointu(soinnut)
      setSointu(tmpSointu)
      }
    }, [soinnut]);

  useEffect(() => {

    if (vastaus.length >= 3) {
      var numberOfTimes = 8;
      var delay = 250;

      for (let i = 0; i < numberOfTimes; i++) {
        setTimeout(function () {
          console.log(valoPaalle);
          setValoPaalle((prev) => {
            if (prev === true) {
              return false
              } 
            else {
              return true
              }
            })//setVastaus  
          }, i * delay)//setTimeout
        }//for
      }//if  
    }, [vastaus]);  
  
  function tallennaSavel(e) {

    if (vastaus.length >= 3) {
      setVastaus([])
      setVastaus((vastaus) => {
        console.log("tyhjennettiin vastaus ja sen sisältö on nyt: " + vastaus) 
        return vastaus 
        });
      }

    setVastaus((prev) => {
      let vastaus = [...prev, e.target.value]
      console.log("vastauslengthi callbakissä: " + vastaus.length);
      if (vastaus.length >= 3) {
        if (oikeatSavelet(collection.get(sointu), vastaus)) {
          setTulos("oikein!");

          //poistetaan oikein vastattu sointu loppujen joukosta
          let tmpSoinnut = [...soinnut];
          tmpSoinnut.splice(soinnut.indexOf(sointu), 1); 
          setSoinnut(tmpSoinnut);
          }
        else {
          console.log("sointuja jäljellä: " + soinnut);
          setTulos("väärin :(");
          setSointu(satunnainen_sointu(soinnut))
          } 
        }
      return [...prev, e.target.value]
      }) 
    }  

  const aloitaAlusta = (e) => { 
    setSoinnut([...savelet]);
    setSekunnit(0);
    setKelloKay(true);
    setVastaus([]);
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

  function palautaVari(savel) {
    if (!vastaus.includes(savel)) { 
      return "blue"
      }
    else {
      if (vastaus.length >= 3) {    
        if (valoPaalle === true) {
          if (tulos === "oikein!")
            return "green"
          else 
            return "red"  
          }//valoPaalle === true
        }//if (vastaus.length >= 3) { 
      return "darkblue"  
      }
    }//palautaVari
      
  
  let nakyma;  

  if (kelloKay) {
    nakyma =       
    <span>
    <h2 id="aika">{aika}</h2>
    <h1 style={{fontSize: '5em'}}>{sointu}</h1> 
    {savelet.slice(0).reverse().map(savel => {
      return ( 
        <button 
          type="button" 
          style={{ backgroundColor: 
                 palautaVari(savel)}}
          onClick={tallennaSavel} 
          value={savel}>
          {savel}
        </button>)
      })
    }
    <br/>
    {nakyma}
    <h2>{vastaus}</h2>
    <br/>
    </span>
    }

  else {
    nakyma = 
    <table>
      <caption>Tulokset</caption>
      <tbody>
        <tr>
          <th>Pelaaja</th>
          <th>Aika</th>
        </tr>
        {tulokset.map(tulos => <tr><td>Anonymous</td><td>{tulos}</td></tr>)}
      </tbody>
    </table>  
    }

  return (
    <div className="App">
      {nakyma}
      <button type="button" onClick={aloitaAlusta}>aloita alusta</button>
      <button type="button" onClick={() => setKelloKay(false) }>pysäytä kello</button>
    </div>
  );
}

export default App;

