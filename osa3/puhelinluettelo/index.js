/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

morgan.token("body", (req, res) => {
	return JSON.stringify(req.body);
});

const app = express();

app.use(express.json());
app.use(morgan(":method :url :body :status :res[content-length]"));
app.use(express.static("build"));

app.get("/", (req, res) => {
	res.send("<h1>Terve Puhelinluettelo!</h1>");
});

app.get("/api/persons", (req, res) => {
	Person.find({})
		.then((persons) => {
			res.json(persons.map(Person.format));
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			res.json(Person.format(person));
		})
		.catch((error) => {
			next(error);
		});
});

app.get("/info", (req, res, next) => {
	Person.countDocuments()
		.then((count) => {
			const body = `
		<p>Puhelinluettelossa on ${count} henkilön tiedot</p>
		<p>${new Date()}</p>`;
			res.send(body);
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
	const body = req.body;

	if (body.name === undefined || body.number === undefined) {
		return res.status(400).json({
			error: "name or number missing from req body",
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then((savedPerson) => {
			res.json(Person.format(savedPerson));
		})
		.catch((error) => {
			next(error);
		});
});

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => {
			next(error);
		});
});

app.put("/api/persons/:id", (req, res, next) => {
	const { name, number } = req.body;

	Person.findByIdAndUpdate(
		req.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: "query" },
	)
		.then((updatedPerson) => {
			res.json(Person.format(updatedPerson));
		})
		.catch((error) => {
			next(error);
		});
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
