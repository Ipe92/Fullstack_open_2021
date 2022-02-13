require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

morgan.token("body", (req, res) => {
	return JSON.stringify(req.body);
});

const app = express();

app.use(express.json());
app.use(morgan(":method :url :body :status :res[content-length] - :res-time ms"));
app.use(express.static("build"));

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendick",
		number: "39-23-6423122",
	},
];

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

app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

app.get("/info", (req, res) => {
	const body = `<p>Puhelinluettelossa on ${
		persons.length
	} henkilön tiedot</p><br/><p>${new Date()}</p>`;
	res.send(body);
});

app.post("/api/persons", (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: "name or number missing from req body",
		});
	}

	if (persons.find((person) => person.name === body.name)) {
		return res.status(400).json({
			error: "name must be unique",
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
			console.log(error);
		});
});

app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter((person) => person.id !== id);
	res.status(204).end();
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformatted id" });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
