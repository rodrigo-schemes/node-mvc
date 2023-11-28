const Task = require('../models/Task')

module.exports = class TaskController {
  static createTask(req, res) {
    res.render('tasks/create')
  }

  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    }

    await Task.create(task)
    res.redirect('/tasks')
  }

  static showTasks(req, res) {
    Task.findAll({ raw: true })
      .then((data) => {
        let emptyTasks = false

        if (data.length === 0) {
          emptyTasks = true
        }

        res.render('tasks/all', { tasks: data, emptyTasks })
      })
      .catch((err) => console.log(err))
  }

  static async removeTask(req, res) {
    const id = req.body.id

    await Task.destroy({ where: { id: id } })
    res.redirect('/tasks')
  }

  static updateTask(req, res) {
    const id = req.params.id

    Task.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('tasks/edit', { task: data })
      })
      .catch((err) => console.log())
  }

  static async updateTaskPost(req, res) {
    const id = req.body.id

    const task = {
      title: req.body.title,
      description: req.body.description,
    }

    await Task.update(task, { where: { id: id } })
    res.redirect('/tasks')
  }

  static async toggleTaskStatus(req, res) {
    const id = req.body.id

    console.log(req.body)

    const task = {
      done: req.body.done === '0' ? true : false
    }

    console.log(task)

    await Task.update(task, { where: { id: id } })
    res.redirect('/tasks')
  }
}