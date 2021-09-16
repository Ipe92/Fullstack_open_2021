import React from "react";
import { Container, Divider, Header, Image } from "semantic-ui-react";

const DetailsCountry = (country) => {
	console.log(country);
	return (
		<Container textAlign="right">
			{country.country.map((c, i) => (
				<Container textAlign="center">
					<Header as="h1">{c.name}</Header>
					<Divider />
					<div>Capital: {c.capital}</div>
					<div>Population: {c.population}</div>
					<Header as="h2">languages</Header>

					{c.languages.map((l, i) => (
						<li key={i}>{l.name}</li>
					))}

					<Divider />
					<Image
						src={c.flag}
						alt="flag"
						height="20%"
						width="20%"
					></Image>
				</Container>
			))}
		</Container>
	);
};

export default DetailsCountry;
