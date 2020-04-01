import DAOModel from '../dAOModel';

export default interface PersonDAOModel extends DAOModel {
  name: string;
  sponsor_id?: string;
}
