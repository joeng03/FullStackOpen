var persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
    show: true,
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
    show: true,
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
    show: true,
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    show: true,
  },
];
const morgan = require("morgan");

morgan.token("data", function (req, res) {
  return req.method === "POST" && JSON.stringify(req.body);
});

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
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
  res.send(`<pre>Phonebook has info for ${persons.length} people
${new Date()}</pre>`);
});
app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name) return res.status(400).json({ error: "Name missing" });
  if (!person.number) return res.status(400).json({ error: "Number missing" });
  if (persons.find((p) => p.name === person.name))
    return res.status(409).json({ error: "Name must be unique" });

  person.id = Math.floor(Math.random() * 1000);
  persons = persons.concat(person);
  res.json(person);
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
