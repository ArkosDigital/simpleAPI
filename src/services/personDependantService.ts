import PersonService from './personService';
import personDependantDAO from '../dAO/personDependantDAO';

class PersonDependantService extends PersonService {
  protected personDAO = personDependantDAO;
}

export default new PersonDependantService();
