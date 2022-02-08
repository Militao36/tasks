import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Label from 'App/Models/Label'

export default class LabelsController {
  public async index({}: HttpContextContract) {
    return Label.all()
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ params }: HttpContextContract) {
    const data = await Label.findOrFail(params.id)
    return data
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
