const getAllTasks = (req,res) => {
    res.send('all items from controller');
}

const createTask = (req,res) => {
    res.json(req.body);
}
const getTask = (req,res) => {
    res.json({id: req.params.id});
}
const updateTask = (req,res) => {
    res.send('updated task');
}
const deleteTask = (req,res) => {
    res.send('deleted task');
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}