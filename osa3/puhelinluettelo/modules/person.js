const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
