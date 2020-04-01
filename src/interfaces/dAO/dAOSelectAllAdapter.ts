import DAOModel from '../../models/dAOModel';

export default interface DAOSelectAllAdapter {
  selectAll(): Promise<Array<DAOModel>>;
}
