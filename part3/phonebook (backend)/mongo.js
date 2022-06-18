const mongoose = require("mongoose");

if (process.argv.length === 5) {
  const [password, name, number] = process.argv.slice(2);
  const url = `mongodb+srv://joeng03:${password}@city.iwxyz.mongodb.net/City?authSource=admin&replicaSet=atlas-t8rb7x-shard-0&readPreference=primary&ssl=true`;
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  const Person = new mongoose.model("Person", personSchema);
  mongoose
    .connect(url)
    .then((results) => {
      console.log("Connected");
      const person = new Person({
        name,
        number,
      });
      return person.save();
    })
    .then(() => {
      console.log("person saved!");
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else if (process.argv.length === 3) {
  const password = process.argv[2];
  const url = `mongodb+srv://joeng03:${password}@city.iwxyz.mongodb.net/City?authSource=admin&replicaSet=atlas-t8rb7x-shard-0&readPreference=primary&ssl=true`;
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  const Person = mongoose.model("Person", personSchema);
  mongoose
    .connect(url)
    .then((result) =>
      // console.log("Connected");
      Person.find({})
    )
    .then((persons) => {
      console.log("phonebook:");
      persons.forEach((person) =>
        console.log(`${person.name} ${person.number}`)
      );
      // console.log("Finished listing");
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
} else {
  console.log(
    " Either enter 3 arguments: node mongo.js <password>\n or 5 arguments: node mongo.js < password > <name> <number>"
  );
  process.exit(1);
}
