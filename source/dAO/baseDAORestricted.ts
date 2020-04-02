import DAORestrictedAdapter from '../adapter/dAO/dAORestrictedAdapter';
import BaseDAOSimple from './baseDAOSimple';
import BaseDAOStore from './baseDAOStore';
import BaseDAOUpdate from './baseDAOUpdate';
import { Mixin } from 'ts-mixer';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseDAORestricted
  extends Mixin(BaseDAOSimple, BaseDAOStore, BaseDAOUpdate)
  implements DAORestrictedAdapter {}
