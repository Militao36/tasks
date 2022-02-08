import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return User.query().select(['id', 'username', 'email', 'setor'])
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ params }: HttpContextContract) {
    const { id } = params
    const data = await User.findByOrFail('id', id)

    await data.load('projects', (query) => {
      query.select(['id', 'title', 'description', 'startDate', 'endDate'])
    })

    return data
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
