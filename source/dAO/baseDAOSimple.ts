import DAOSimpleAdapter from '../adapter/dAO/dAOSimpleAdapter';
import BaseDAOSelectAll from './baseDAOSelectAll';
import BaseDAOSelectById from './baseDAOSelectById';
import { Mixin } from 'ts-mixer';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseDAOSimple
  extends Mixin(BaseDAOSelectAll, BaseDAOSelectById)
  implements DAOSimpleAdapter {}
