const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
	},
	number: String,
});

personSchema.statics.format = (person) => {
	return {
		name: person.name,
		number: person.number,
		id: person._id,
	};
};

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
