const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.co2lh.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv[3] && process.argv[4]) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	});

	console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`);

	person.save().then((result) => {
		console.log(`${person.name} saved!`);
		mongoose.connection.close();
	});
} else {
	console.log("puhelinluettelo:");
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(person.name, person.number);
		});
		mongoose.connection.close();
	});
}
