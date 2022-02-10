import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TasksController.index')
  Route.get('/:id', 'TasksController.show')
  Route.post('/', 'TasksController.store')
  Route.put('/:id', 'TasksController.update')
}).prefix('/tasks')
