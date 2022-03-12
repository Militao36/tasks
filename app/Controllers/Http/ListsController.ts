import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import List from 'App/Models/List'

export default class ListsController {
  public async index({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['title'])

    const { id } = await List.create({
      title: data.title
    })

    return response.created({ id })
  }

  public async store({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
