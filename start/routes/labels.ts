import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'LabelsController.index')
  Route.get('/:id', 'LabelsController.show')
}).prefix('/labels')
