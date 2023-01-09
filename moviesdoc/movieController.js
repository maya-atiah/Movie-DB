const blogService = require("./movieService");
 
exports.getAllBlogs = async (req, res) => {
  try {
    const movies = await blogService.getAllBlogs();
    res.json({ data: movies, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createBlog = async (req, res) => {
  try {
    const movie = await blogService.createBlog(req.body);
    res.json({ data: movie, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getBlogById = async (req, res) => {
  try {
    const movie = await blogService.getBlogById(req.params.id);
    res.json({ data:movie, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateBlog = async (req, res) => {
  try {
    const movie = await blogService.updateBlog(req.params.id, req.body);
    res.json({ data: movie, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteBlog = async (req, res) => {
  try {
    const movie = await blogService.deleteBlog(req.params.id);
    res.json({ data: movie, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};