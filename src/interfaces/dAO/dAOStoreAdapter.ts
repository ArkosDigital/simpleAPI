import DAOModel from '../../models/dAOModel';
import DAOSimpleModel from '../../models/dAOSimpleModel';

export default interface DAOStoreAdapter {
  store(content: DAOSimpleModel): Promise<DAOModel>;
}
