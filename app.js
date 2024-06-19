const express = require('express');
const app = express(); //we initialize and invoke it(express)
const tasks = require('./routes/tasks')

//middleware
app.use(express.json())

//routes
app.get('/health',(req,res)=> {
    res.send('Task Manager App');
})

app.use('/api/v1/tasks',tasks);



const port = 9000

app.listen(port, console.log(`Server is listening on port ${port}`));