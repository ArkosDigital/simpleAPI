import service from '../services/personDependantService';
import BaseController from './baseController';
import PersonServiceModel from '../models/person/personServiceModel';
import PersonServiceSimpleModel from '../models/person/personServiceSimpleModel';
class PersonDependantController extends BaseController {
  protected element = 'dependant';

  protected elements = 'dependants';

  protected selectById(id: string): Promise<PersonServiceModel> {
    return service.selectById(id);
  }

  protected selectAll(): Promise<Array<PersonServiceModel>> {
    return service.selectAll();
  }

  protected storeElement(
    content: PersonServiceSimpleModel
  ): Promise<PersonServiceModel> {
    return service.store(content);
  }

  protected updateElement(
    id: string,
    content: PersonServiceSimpleModel
  ): Promise<PersonServiceModel> {
    return service.update(id, content);
  }

  protected deleteElement(id: string): Promise<boolean> {
    return service.delete(id);
  }
}

export default new PersonDependantController();
