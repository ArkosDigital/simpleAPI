/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import DAOAdapter from '../adapter/dAO/dAOAdapter';
import BaseDAORestricted from './baseDAORestricted';
import BaseDAODelete from './baseDAODelete';
import { Mixin } from 'ts-mixer';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseDAO extends Mixin(BaseDAORestricted, BaseDAODelete)
  implements DAOAdapter {}
