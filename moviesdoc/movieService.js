const movieModel = require("./movies");
 
exports.getAllBlogs = async () => {
  return await movieModel.find();
};
 
exports.createBlog = async (movie) => {
  return await movieModel.create(movie);
};
exports.getBlogById = async (id) => {
  return await movieModel.findById(id);
};
 
exports.updateBlog = async (id, movie) => {
  return await movieModel.findByIdAndUpdate(id, movie);
};
 
exports.deleteBlog = async (id) => {
  return await movieModel.findByIdAndDelete(id);
};