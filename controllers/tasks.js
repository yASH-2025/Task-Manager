const Task = require('../models/task')
const asyncWrapper = require('../middleware/asyncWrapper')

//get all task
const getAllTasks = asyncWrapper (async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

//cretate new task
const createTask = asyncWrapper (async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

// get a particular task
const getTask = asyncWrapper (async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) { // if no tasks are found
        return res.status(404).json({ msg: `No task found with id: ${taskID}` })
    }
    res.status(200).json({ task })
})

//Delete task
const deleteTask = asyncWrapper (async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if(!task){
        return res.status(404).json({ msg: `No task found with id: ${taskID}`})
    }
    res.status(200).json({ task })
})

//update a particular task
const updateTask = asyncWrapper (async (req, res) => {
    const { id: taskID } = req.params
    //parameter to find, body, options
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {//options
        new: true,
        runValidators: true // applies those validators while updating that were implied at the time of creating the schema
    })

    if(!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}`})
    }
    res.status(200).json({ task })
})

// If we want to use the put method instead of patch, mongoose doesn't do it automatically we have to add another option named overwrite:true

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}