import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:status', 'TasksController.tasks')
  Route.get('/', 'TasksController.index')

  Route.get('/:id', 'TasksController.show').where('id', Route.matchers.uuid())
  Route.put('/:id', 'TasksController.update').where('id', Route.matchers.uuid())

  Route.post('/', 'TasksController.store')
}).prefix('/tasks')
