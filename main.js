const express = require('express')
const mongoose = require('mongoose');
const Todo = require('./models/Todo.js') 

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/To-Do-List');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {

    const todos = await Todo.find();
    
    res.render('index.ejs', {todos})
})

app.get('/add-data', async (req, res) => {
    let { title , desc , date , isCompleted } = req.query;
    
    date = new Date(date);

    try{
        const newTodo = new Todo({
            title,
            desc,
            date,
            isComplete : isCompleted === 'true'
        })

        await newTodo.save();
        res.status(200).json({message : "New task added"});
    }
    catch(error){
        res.status(500).json({error : "Failed to save todo"});
    }
});

app.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        await Todo.findByIdAndDelete(id)
        res.status(200).json({message : "Todo deleted successfully!!!"})
    }
    catch(error){
        res.status(500).json({ error: 'Failed to delete todo' });
    }

})
app.delete('/clear-all', async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.status(200).json({ message: 'All todos cleared successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear todos' });
  }
});

app.patch('/complete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        let todo = await Todo.findById(id)
        await Todo.findByIdAndUpdate(id , {isComplete : !todo.isComplete})
        res.status(200).json({message : "Todo marked completed successfully!!!"})
    }
    catch(error){
        res.status(500).json({ error: 'Failed to upadate todo' });
    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
