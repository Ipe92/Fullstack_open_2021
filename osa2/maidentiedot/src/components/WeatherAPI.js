import React, { useState, useEffect } from "react";
import { Image, Container, Header } from "semantic-ui-react";
import axios from "axios";
require("dotenv").config();

const WeatherAPI = (city) => {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		axios
			.get("http://api.weatherstack.com/current", { params })
			.then((response) => {
				console.log("promise fulfilled");
				setWeather(response.data);
			});
	}, []);

	const params = {
		access_key: process.env.REACT_APP_API_KEY,
		query: city.city,
	};

	console.log("saa", weather);

	return (
		<Container>
			<Header as="h2">Weather in {city.city}</Header>
			<div>
				<b>temperature:</b> {weather?.current?.temperature}
			</div>
			<Image
				src={weather?.current?.weather_icons[0]}
				alt="weather_icon"
				height="10%"
				width="10%"
			></Image>
			<div>
				<b>wind: </b> {weather?.current?.wind_speed}mph direction{" "}
				{weather?.current?.wind_dir}
			</div>
		</Container>
	);
};

export default WeatherAPI;
