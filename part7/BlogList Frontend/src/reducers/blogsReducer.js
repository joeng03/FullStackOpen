import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );
    },
    deleteBlog(state, action) {
      const deletedBlogID = action.payload;
      return state.filter((blog) => blog._id !== deletedBlogID);
    },
  },
});
export const { setBlogs, createBlog, updateBlog, deleteBlog } =
  blogsSlice.actions;

export const acSetBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const acCreateBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(createBlog(newBlog));
  };
};

export const acUpdateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog);
    dispatch(updateBlog(updatedBlog));
  };
};
export const acDeleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch(deleteBlog(blog._id));
  };
};
export const acCreateComment = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.createComment(blog, comment);
    dispatch(updateBlog(updatedBlog));
  };
};
export default blogsSlice.reducer;
