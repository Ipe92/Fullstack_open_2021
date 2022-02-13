const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv[2] && process.argv[3]) {
	const person = new Person({
		name: process.argv[2],
		number: process.argv[3],
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
