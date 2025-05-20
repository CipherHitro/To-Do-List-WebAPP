const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    date: Date,
    isComplete: Boolean,
    createdBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    }
});

const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;
