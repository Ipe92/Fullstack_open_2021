const express = require("express");
const morgan = require("morgan");

morgan.token("body", (request, response) => {
	return JSON.stringify(request.body);
});

const app = express();

app.use(express.json());

app.use(morgan(":method :url :body :status :res[content-length] - :response-time ms"));

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
	res.json(persons);
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

const generateId = () => {
	return Math.floor(Math.random() * 10000);
};

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

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	};

	persons = persons.concat(person);
	res.json(person);
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

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
