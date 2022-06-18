/*
const morgan = require("morgan");

morgan.token("data", function (req, res) {
  return req.method === "POST" && JSON.stringify(req.body);
}); */
require("dotenv").config();
const express = require("express");
const Person = require("./models/person");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("build"));
app.use(express.json());
/*
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
); */

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => console.log(err));
});
app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((result) => {
      if (result) res.json(result);
      else res.status(404).end();
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res) => {
  Person.find({})
    .then((persons) => {
      res.send(`<pre>Phonebook has info for ${persons.length} people
${new Date()}</pre>`);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/api/persons", (req, res, next) => {
  // const person = req.body;
  if (!req.body.name) return res.status(400).json({ error: "Name missing" });
  if (!req.body.number)
    return res.status(400).json({ error: "Number missing" });
  /* if (persons.find((p) => p.name === person.name))
    return res.status(409).json({ error: "Name must be unique" }); */
  return Person.find({ name: req.body.name }).then((result) => {
    if (result.length !== 0) {
      return res.status(409).json({ error: "Name must be unique" });
    }
    const person = new Person({
      name: req.body.name,
      number: req.body.number,
      show: true,
    });
    return person
      .save()
      .then((savedPerson) => res.json(savedPerson))
      .catch((err) => next(err));
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const [id, body] = [req.params.id, req.body];
  const person = {
    name: body.name,
    number: body.number,
    show: true,
  };
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((result) => {
      if (result) res.json(result);
      else {
        res.status(404).send({
          error: `Information of ${body.name} has already been removed from server`,
        });
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  }
  return next(err);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
