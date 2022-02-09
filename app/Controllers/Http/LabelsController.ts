import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Label from 'App/Models/Label'

export default class LabelsController {
  public async index({}: HttpContextContract) {
    return Label.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'color'])

    await Label.create(data)

    const { id } = await Label.findByOrFail('name', data.name)

    return response.status(201).json({ id })
  }

  public async show({ params }: HttpContextContract) {
    const data = await Label.findOrFail(params.id)
    return data
  }

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
