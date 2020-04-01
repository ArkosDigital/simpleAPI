import DAOModel from '../../models/dAOModel';

export default interface DAOSelectByIdAdapter {
  selectById(id: string): Promise<DAOModel>;
}
