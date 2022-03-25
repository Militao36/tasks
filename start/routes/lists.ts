import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ListsController.index')
  Route.post('/', 'ListsController.create')
  Route.put('/:id', 'ListsController.update')
  Route.get('/:id', 'ListsController.show')
})
  .prefix('/lists')
  .middleware('auth')
