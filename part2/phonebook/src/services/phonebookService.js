import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const create = (newObj) => axios.post(baseUrl, newObj).then((res) => res.data);

const read = (id) => axios.get(`${baseUrl}/${id}`).then((res) => res.data);

const update = (id, newObj) =>
  axios.put(`${baseUrl}/${id}`, newObj).then((res) => res.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

const phonebookService = { read, create, update, remove };
export default phonebookService;
