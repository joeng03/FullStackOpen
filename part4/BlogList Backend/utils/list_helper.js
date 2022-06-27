const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
const favoriteBlog = (blogs) => {
  const favoriteBlog =
    blogs[
      blogs.reduce((curMax, blog, idx) => {
        return blog.likes > blogs[curMax].likes ? idx : curMax;
      }, 0)
    ];
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};
const mostBlogs = (blogs) => {
  const authors = {};
  blogs.forEach((blog) => {
    if (authors.hasOwnProperty(blog.author)) authors[blog.author] += 1;
    else authors[blog.author] = 1;
  });
  let numBlogs = 0,
    selectedKey;
  for (let key of Object.keys(authors)) {
    if (authors[key] > numBlogs) {
      numBlogs = authors[key];
      selectedKey = key;
    }
  }
  return {
    author: selectedKey,
    blogs: authors[selectedKey],
  };
};

const mostLikes = (blogs) => {
  const authors = {};
  blogs.forEach((blog) => {
    if (authors.hasOwnProperty(blog.author)) authors[blog.author] += blog.likes;
    else authors[blog.author] = blog.likes;
  });
  let numLikes = 0,
    selectedKey;
  for (let key of Object.keys(authors)) {
    if (authors[key] > numLikes) {
      numLikes = authors[key];
      selectedKey = key;
    }
  }
  return {
    author: selectedKey,
    likes: authors[selectedKey],
  };
};
module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };
