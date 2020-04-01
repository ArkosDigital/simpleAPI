import DAOModel from '../../models/dAOModel';
import DAOSimpleModel from '../../models/dAOSimpleModel';

export default interface DAOUpdateAdapter {
  update(id: string, content: DAOSimpleModel): Promise<DAOModel>;
}
