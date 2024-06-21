const express = require('express');
const app = express(); //we initialize and invoke it(express)
const tasks = require('./src/routes/tasks');
const connectDb = require('./src/db/connect');
require('dotenv').config();
const notFound = require('./src/middleware/not-found');
const errorHandlerMiddleware = require('./src/middleware/error-handler')

//middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
// app.get('/health',(req,res)=> {
//     res.send('Task Manager App');      Not required to check anymore
// })

app.use('/api/v1/tasks',tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 9000;

const start = async () => {
    try{
       await connectDb(process.env.MONGO_URI);
       app.listen(port, console.log(`Server is listening on port ${port}`));
    }catch(error){
        console.log(error);
    }
}

start()
