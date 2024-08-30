const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const apiKey = process.env.WEATHERAPIKEY

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city
        if (!city) return res.status(400).send({ error: 'Please provide a city' });
        
        const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
        const response = await axios.get(url);
        
        const data = response.data;    

        if (data.error) return res.status(400).send({ error: data.error.info });

        res.send({
            location: data.location.name,
            temperature: data.current.temperature,
            description: data.current.weather_descriptions[0],
            wind_speed: data.current.wind_speed,
            humidity: data.current.humidity,
            feelslike: data.current.feelslike
        });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is Listening on PORT ${PORT}`);
});
