/*global swal*/

import React, { useState, useEffect } from 'react';
import Sound from 'react-sound';
import './App.css';
import logo from './logo.svg';
import loading from './loading.svg';
import Button from './Button';
import {AlbumCover} from './AlbumCover'

const apiToken = 'BQC28d9P9JBCbQWBQeLX_fDnPV7-QGZsvog44xm_pvWjkTsmEzmhxzdHFrhcEE5CdzQlTyQTrzj0Zs_iYt4zEbWQ_O0sPinwRG7lIA0HK9df_Xp29bQku641k7GH_gR5RlF2z-_B8td5KdAuAzHROMb6';




function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}


const App = () => {

  const [text, setText] = useState('');
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setText('Bonjour');
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
      setTracks(data.items);
      setSongsLoaded(true);
      setText('Bien reçu !');
      console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
    })
  },[]);


  if (!songsLoaded) {
    return (
      <div className="App">
        <img src={loading} className="App-logo" alt="logo"/>
      </div>
    );
  }

  const track1 = tracks[0].track;
  const track2 = tracks[1].track;
  const track3 = tracks[2].track;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        <p>{text}</p>
        <AlbumCover track={tracks[0]} />
        <Sound url={tracks[0].track.preview_url} playStatus={Sound.status.PLAYING}/>
      </div>
      <div className="App-buttons">
        <Button>{track1.name}</Button>
        <Button>{track2.name}</Button>
        <Button>{track3.name}</Button>
      </div>
    </div>
  );
}

export default App;
