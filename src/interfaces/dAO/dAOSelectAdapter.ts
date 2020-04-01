import DAOModel from '../../models/dAOModel';

export default interface DAOSelectAdapter {
  select(filter): Promise<Array<DAOModel>>;
}
