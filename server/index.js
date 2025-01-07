const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port =  5000;
app.use(cors());
app.use(express.json());



app.post('/api/weather', (req, res) => {
  try {
    console.dir(req.body);
    fetch(`http://www.7timer.info/bin/api.pl?lon=${req.body.lon}&lat=${req.body.lat}&product=astro&output=json`)
      .then(resp=>resp.json())
      .then(result=>{
        console.dir(result);
        res.send(result);
      })
  } catch (error) {
    console.dir(error)
  }

});

app.listen(port, () => console.log(`Listening on port ${port}`));