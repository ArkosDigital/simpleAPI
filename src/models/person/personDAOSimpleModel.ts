import DAOSimpleModel from '../dAOSimpleModel';

export default interface PersonDAOSimpleModel extends DAOSimpleModel {
  name: string;
  sponsor_id?: string;
}
