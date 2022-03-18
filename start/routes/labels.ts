import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'LabelsController.index')
  Route.get('/:id', 'LabelsController.show')
  Route.post('/', 'LabelsController.store')
})
  .prefix('/labels')
  .middleware('auth')
