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
      .orderBy('createdAt', 'asc')

    return lists
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    const list = await List.findByOrFail('id', id)
    return list
  }

  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'projectId'])

    const { id } = await List.create({
      title: data.title,
      projectId: data.projectId,
    })

    return response.created({ id })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const data = request.only(['title', 'projectId'])

    const list = await List.findByOrFail('id', id)

    list.merge(data)

    await list.save()

    return response.noContent()
  }

  public async store({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
