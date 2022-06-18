import { useState, useEffect } from "react";
import phonebookService from "./services/phonebookService.js";
import "./App.css";
const Header = ({ showHeader }) => {
  const { msg, status } = showHeader;
  if (status === null) return null;

  return (
    <h1 className={status}>{status === "success" ? `Added ${msg}` : msg}</h1>
  );
};
const Filter = ({ searchVal, updateSearchVal }) => {
  return (
    <>
      <h1>Phonebook</h1>
      <form>
        <div>
          <input value={searchVal} onChange={updateSearchVal} />
        </div>
      </form>
    </>
  );
};

const PersonForm = ({ newName, newNum, updateName, updateNum, addPerson }) => {
  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={updateName} />
        </div>
        <div>
          number: <input value={newNum} onChange={updateNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};
const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map(
          (person) =>
            person.show && (
              <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => deletePerson(person)}>delete</button>
              </li>
            )
        )}
      </ul>
    </>
  );
};

const App = () => {
  const [showHeader, setShowHeader] = useState({
    msg: null,
    status: null,
  });
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    phonebookService.read("").then((dat) => {
      setPersons(dat);
    });
  }, []);
  useEffect(() => {
    setPersons((persons) =>
      [...persons].map((person) => {
        //this filter is for prefix of the same length only, it does not check for other substring matches
        person.show =
          searchVal.toLowerCase() ===
          person.name.slice(0, searchVal.length).toLowerCase()
            ? true
            : false;
        return person;
      })
    );
  }, [searchVal]);

  const updateName = (e) => setNewName(e.target.value);
  const updateNum = (e) => setNewNum(e.target.value);
  const updateSearchVal = (e) => setSearchVal(e.target.value);
  const updateHeader = (showHeaderObj) => {
    setShowHeader(showHeaderObj);
    setTimeout(() => setShowHeader({ msg: null, status: null }), 5000);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = persons.find((person) => person.name === newName);
    if (newName && newNum && newPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newPersonObj = {
          name: newName,
          number: newNum,
          id: newPerson.id,
          show: newPerson.show,
        };
        phonebookService
          .update(newPerson.id, newPersonObj)
          .then((dat) =>
            setPersons(
              persons.map((person) =>
                person.id === newPerson.id ? dat : person
              )
            )
          )
          .catch((err) => {
            console.log(err.response.data);
            updateHeader({
              msg: err.response.data.error,
              status: "failure",
            });
            setPersons(persons.filter((person) => person.id !== newPerson.id));
          });
      }
    } else {
      const personObj = {
        name: newName,
        number: newNum,
        show: true,
      };
      phonebookService
        .create(personObj)
        .then((dat) => {
          setPersons(persons.concat(dat));
          updateHeader({
            msg: newName,
            status: "success",
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          updateHeader({ msg: err.response.data.error, status: "failure" });
        });
    }
    setNewName("");
    setNewNum("");
  };
  const deletePerson = (curPerson) => {
    if (window.confirm(`Delete ${curPerson.name}?`))
      phonebookService
        .remove(curPerson.id)
        .then((dat) =>
          setPersons(persons.filter((person) => person.id !== curPerson.id))
        );
  };

  return (
    <div>
      <Header showHeader={showHeader} />
      <Filter searchVal={searchVal} updateSearchVal={updateSearchVal} />
      <PersonForm
        newName={newName}
        newNum={newNum}
        updateName={updateName}
        updateNum={updateNum}
        addPerson={addPerson}
      />
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
