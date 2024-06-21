const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');  // way to avoid try catch redundancy in the controllers
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
})


const createTask = asyncWrapper( async (req, res) => {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
})


/* Code written when using try catch block with the controllers */
const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            //another way of sending the error manually for each controller
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}


const deleteTask = asyncWrapper( async (req, res, next) => {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            //simpler way
            return next(createCustomError(`No task with id: ${taskID}`, 404));
        }
        //various ways to send response back;
        // res.status(200).json({task});
        // res.status(200).send();
        res.status(200).json({ task: null, status: 'success' });
})

const updateTask = asyncWrapper( async (req, res) => {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate(
            { _id: taskID },
            req.body,
            { new: true, runValidators: true } // the new key will always send the updated data and runValidators runs 
            // all the validations written in the backend model schema
            // learn about 'overwrite key' as well can be used with put http method!!
        )
        if (!task) {
            return next(createCustomError(`No task with id: ${taskID}`, 404));
        }
        res.status(200).json({ task, status: 'Updated Successfully' });
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}