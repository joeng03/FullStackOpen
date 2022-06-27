import axios from "axios";
const baseUrl = "/api/blogs/";
var token = null;
const setToken = (_token) => (token = _token);
const getToken = () => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};
const create = async (blog) => {
  const res = await axios.post(baseUrl, blog, getToken());
  return res.data;
};
const update = async (blog) => {
  const res = await axios.put(baseUrl + blog._id, blog, getToken());
  return res.data;
};
const remove = async (blog) => {
  const res = await axios.delete(baseUrl + blog._id, getToken());
  return res.data;
};
const blogService = { setToken, getAll, create, update, remove };
export default blogService;
