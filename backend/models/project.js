const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    project_name: String,
    author: String,
    img_url: String,
    portfolio_url: String
})

module.exports = mongoose.model("Product", projectSchema)