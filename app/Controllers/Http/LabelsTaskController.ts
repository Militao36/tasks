/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LabelsTask from 'App/Models/labelsTask'
export default class TasksController {
  public async index({  }: HttpContextContract) {
    
  }

  public async store({ request, response}: HttpContextContract) {
    const data = request.only(['label_id', 'task_id'])

    const labelsTask = new LabelsTask()

    labelsTask.fill({
      labelId: data?.label_id ?? null,
      taskId: data?.task_id ?? null,

    })

    await labelsTask.save()

    return response.status(201).json({ id: labelsTask.id })
  }

  public async update({  }: HttpContextContract) {
  
  }

  public async show({  }: HttpContextContract) {
   
  }

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
