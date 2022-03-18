import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:id', 'TasksController.show')
  Route.put('/:id', 'TasksController.update')

  Route.post('/', 'TasksController.store')
  Route.post('/task/move', 'TasksController.updatedTaskMoveForList')

  Route.get('/status/:status', 'TasksController.tasks')
  Route.get('/', 'TasksController.index')
})
  .prefix('/tasks')
  .middleware('auth')
