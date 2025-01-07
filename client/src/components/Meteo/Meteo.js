import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Meteo() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const apiCall = async () => {
            let lon, lat;
            navigator.geolocation.getCurrentPosition((pos) => {
                console.dir(pos);
                lat = pos.coords.latitude;
                lon = pos.coords.longitude;
                axios.post('http://localhost:5000/api/weather', { "lon": lon, "lat": lat })
                    .then(
                        (response) => {
                            console.dir(response.data);
                            setData(response.data);
                        }
                    )
            })
        }
        apiCall();
    }, []);
    return (
        <>
            <h2>And the weather is : </h2>
            <div>{data !== null ? data.dataseries.map((value,index)=>{
                return (
                    <div key={index}>
                        <div>Prevision dans {value.timepoint} heures</div>
                        <div>Couverture Nuageuse : {value.cloudcover}</div>
                        <div>Temperature : {value.temp2m} °C</div>
                        <div>Vent direct : {value.wind10m.direction}</div>
                        <div>Vent vitesse : {value.wind10m.speed}</div>
                        <div>Humidite : {value.rh2m}</div>
                    </div>
                )
            }) : "chargement ..."}</div>
        </>
    )
}

export default Meteo

