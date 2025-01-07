
import { useState } from 'react';
import './App.css';
import Meteo from './components/Meteo/Meteo';
import Horoscope from './components/Horoscope/Horoscope';

const App = () => {
  const [displayMeteo, setDisplayMeteo] = useState(false);
  const [displayHoroscope, setDisplayHoroscope] = useState(false);
  const showMeteo = () => {
    setDisplayMeteo(!displayMeteo);
  }
  const showHoroscope = () => {
    setDisplayHoroscope(!displayHoroscope);
  }
  return (
    <div className="App">
      <div><button onClick={showMeteo}>Meteo du jour</button></div>
      {displayMeteo ? <Meteo></Meteo> : ""}
      <div><button onClick={showHoroscope}>Horoscope du jour</button></div>
      {displayHoroscope ? <Horoscope></Horoscope> : ""}
    </div>
  );
}

export default App;
