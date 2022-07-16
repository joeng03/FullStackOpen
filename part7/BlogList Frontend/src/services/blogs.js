import axios from "axios";
const baseUrl = "/api/blogs";
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
const createComment = async (blog, comment) => {
  const res = await axios.post(`${baseUrl}/${blog._id}/comments`, comment);
  return res.data;
};
const update = async (blog) => {
  const res = await axios.put(`${baseUrl}/${blog._id}`, blog, getToken());
  return res.data;
};
const remove = async (blog) => {
  await axios.delete(`${baseUrl}/${blog._id}`, getToken());
};
const blogService = { setToken, getAll, create, createComment, update, remove };

export default blogService;
