import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Meteo.css';
const formatCloudCover = (value) => {
    switch (value) {
        case 1:
            return "0%-6%"
        case 2:
            return "6%-19%"
        case 3:
            return "19%-31%"
        case 4:
            return "31%-44%"
        case 5:
            return "44%-56%"
        case 6:
            return "56%-69%"
        case 7:
            return "69%-81%"
        case 8:
            return "81%-94%"
        case 9:
            return "94%-100%"
        default:
            break;
    }
}
const formatWindSpeed = (value) => {
    switch (value) {
        case 1:
            return "Below 0.3m/s (calm)"
        case 2:
            return "0.3-3.4m/s (light)"
        case 3:
            return "3.4-8.0m/s (moderate)"
        case 4:
            return "8.0-10.8m/s (fresh)"
        case 5:
            return "10.8-17.2m/s (strong)"
        case 6:
            return "17.2-24.5m/s (gale)"
        case 7:
            return "24.5-32.6m/s (storm)"
        case 8:
            return "Over 32.6m/s (hurricane)"
        default:
            break;
    }
}
const formatHum = (value) => {
    switch (value) {
        case -4:
            return "0%-5%";
        case -3:
            return "5%-10%";
        case -2:
            return "10%-15%";
        case -1:
            return "15%-20%";
        case -0:
            return "20%-25%";
        case 1:
            return "25%-30%";
        case 2:
            return "30%-35%";
        case 3:
            return "35%-40%";
        case 4:
            return "40%-45%";
        case 5:
            return "45%-50%";
        case 6:
            return "50%-55%";
        case 7:
            return "55%-60%";
        case 8:
            return "60%-65%";
        case 9:
            return "65%-70%";
        case 10:
            return "70%-75%";
        case 11:
            return "75%-80%";
        case 12:
            return "80%-85%";
        case 13:
            return "85%-90%";
        case 14:
            return "90%-95%";
        case 15:
            return "95%-99%";
        case 16:
            return "100%";
        default:
            break;
    }
}
const Meteo = () => {
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
                            let formatData = response.data.dataseries.map((value) => {
                                value.cloudcover = formatCloudCover(value.cloudcover);
                                value.wind10m.speed = formatWindSpeed(value.wind10m.speed);
                                value.rh2m = formatHum(value.rh2m);
                                return value;
                            })
                            setData(formatData);
                            console.dir(formatData);
                        }
                    )
            })
        }
        apiCall();
    }, []);
    return (
        <div className='meteo'>
            <h2>And the weather is : </h2>
            <div>{data !== null ? data.map((value, index) => {
                return (
                    <div className='prevision' key={index}>
                        <div>Prevision dans {value.timepoint} heures</div>
                        <div>Couverture Nuageuse : {value.cloudcover}</div>
                        <div>Temperature : {value.temp2m} °C</div>
                        <div>Vent direction : {value.wind10m.direction}</div>
                        <div>Vent vitesse : {value.wind10m.speed}</div>
                        <div>Humidite : {value.rh2m}</div>
                    </div>
                )
            }) : "chargement ..."}</div>
        </div>
    )
}

export default Meteo

