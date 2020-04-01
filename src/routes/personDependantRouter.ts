import { Router } from 'express';
import PersonController from '../controllers/personDependantController';

export default function PersonDependantRouter(routes: Router): void {
  routes.get('/dependant/:id', PersonController.index.bind(PersonController));
  routes.get('/dependant', PersonController.show.bind(PersonController));
  routes.post('/dependant', PersonController.store.bind(PersonController));
  routes.put('/dependant/:id', PersonController.update.bind(PersonController));
  routes.delete(
    '/dependant/:id',
    PersonController.delete.bind(PersonController)
  );
}
