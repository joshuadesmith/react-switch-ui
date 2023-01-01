/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.listen(port, () => console.debug(`Listening on port ${port}`));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const openMeteoUrl = 'https://api.open-meteo.com/v1/forecast';
app.get('/weather', (req, res) => {
  const params = {
    latitude: req.query.lat,
    longitude: req.query.lon,
    temperature_unit: 'fahrenheit',
    current_weather: true
  };
  axios.get(openMeteoUrl, { params })
    .then(response => res.status(200).send(response.data))
    .catch(err => res.status(err.response.status).send(err.response.data));
});

const steamRecentlyPlayedUrl = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/'
app.get('/games/recent', (req, res) => {
  const params = {
    steamid: req.query.steamId,
    count: 5,
    key: req.query.steamApiKey
  };
  axios.get(steamRecentlyPlayedUrl, { params })
    .then(response => res.status(response.status).send(response.data))
    .catch(err => {
      const errData = err.response.data;
      console.error(errData)
      res.status(err.response.status).send(errData);
    });
});
