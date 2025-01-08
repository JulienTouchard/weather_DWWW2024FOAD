const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());



app.post('/api/weather', (req, res) => {
  try {
    console.dir(req.body);
    fetch(`http://www.7timer.info/bin/api.pl?lon=${req.body.lon}&lat=${req.body.lat}&product=astro&output=json`)
      .then(resp => resp.json())
      .then(result => {
        res.send(result);

        // Ajout et formatage de la date
        let d = new Date();
        let dformat = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        result.date = dformat;
        let tmpData
        // Enregistrement des données dans un json
        const filePath = path.join(__dirname, 'data', 'data.json');
        if (fs.existsSync(filePath)) {
          tmpData = JSON.parse(fs.readFileSync(filePath).toString());
        } else {
          tmpData = { dataHistory: [] };
        }
        tmpData['dataHistory'].push({
          "newEntry": result
        });
        fs.writeFileSync(filePath, JSON.stringify(tmpData));
      })
  } catch (error) {
    console.dir(error)
  }

});

app.listen(port, () => console.log(`Listening on port ${port}`));