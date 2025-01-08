
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
      <div className='rub'><button onClick={showMeteo}>Meteo du jour</button>
        {displayMeteo ? <Meteo></Meteo> : ""}
      </div>
      <div className='rub'><button onClick={showHoroscope}>Horoscope du jour</button>
        {displayHoroscope ? <Horoscope></Horoscope> : ""}
      </div>
    </div>
  );
}

export default App;
