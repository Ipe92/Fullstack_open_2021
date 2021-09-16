import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, List } from "semantic-ui-react";
import DetailsCountry from "./DetailsCountry";

const SearchCountry = () => {
	const [countries, setCountries] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [tooMany, setTooMany] = useState(true);
	const [showDetails, setShowDetails] = useState(false);

	useEffect(() => {
		console.log("effect");
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			console.log("promies fulfilled");
			setCountries(response.data);
		});
	}, []);
	console.log("render", countries.length, "countries");
	console.log(countries);

	const filterCountries = () => {
		const filt = countries.filter((c) => {
			return c.name.toLowerCase().includes(searchFilter.toLowerCase());
		});
		console.log(filt.length);

		if (filt.length > 10) {
			setTooMany(true);
			setShowDetails(false);
			setFilteredCountries(filt);
		} else {
			console.log("10< tulosta");
			setTooMany(false);
			setShowDetails(false);
			setFilteredCountries(filt);
		}
		if (filt.length === 1) {
			setShowDetails(true);
		}
	};

	const handleChange = (event) => {
		setSearchFilter(event.target.value);
		filterCountries();
	};

	console.log(searchFilter);
	console.log("toomany", tooMany);

	const showCountry = (event) => {
		const filt = countries.filter((c) => {
			return c.name
				.toLowerCase()
				.includes(event.target.value.toLowerCase());
		});
		setTooMany(false);
		setShowDetails(true);
		setFilteredCountries(filt);
	};

	return (
		<div>
			<div>search countries</div>
			<Input
				placeholder="search"
				value={searchFilter}
				onChange={handleChange}
			/>
			{tooMany ? (
				"Too many to show"
			) : showDetails ? (
				<DetailsCountry country={filteredCountries} />
			) : (
				<List>
					{filteredCountries.map((c, i) => {
						return (
							<List.Item as="li" key={i}>
								{c.name}
								<Button
									className={c.name}
									value={c.name}
									onClick={showCountry}
								>
									show
								</Button>
							</List.Item>
						);
					})}
				</List>
			)}
		</div>
	);
};

export default SearchCountry;
