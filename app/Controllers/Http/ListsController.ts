import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import List from 'App/Models/List'

export default class ListsController {
  public async index({ response, request }: HttpContextContract) {
    const { projectId } = request.qs()

    if (!projectId) {
      return response.notFound()
    }

    const lists = await List.query()
      .select(['id', 'title', 'projectId'])
      .where('project_id', projectId)

    return lists
  }

  public async show({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'projectId'])

    const { id } = await List.create({
      title: data.title,
      projectId: data.projectId,
    })

    return response.created({ id })
  }

  public async store({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
