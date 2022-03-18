import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import List from 'App/Models/List'
import Project from 'App/Models/Project'

export default class ListSeeder extends BaseSeeder {
  public async run() {
    const projects = await Project.findBy('title', 'Winfit')

    const listOne = await List.create({
      title: 'Em avaliação',
      projectId: projects?.id,
    })

    const listTwo = await List.create({
      title: 'Em desenvolvimento',
      projectId: projects?.id,
    })

    await projects?.load('tasks')

    let cout = 0
    const list = [listOne.id, listTwo.id]

    for await (const item of projects!.tasks) {
      item.merge({
        listId: list[cout],
      })

      await item.save()

      cout += 1
    }

    // Write your database queries inside the run method
  }
}
