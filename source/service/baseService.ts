import { Mixin } from 'ts-mixer';
import ServiceAdapter from '../adapter/service/serviceAdapter';
import BaseServiceRestricted from './baseServiceRestricted';
import BaseServiceReserved from './baseServiceReserved';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default abstract class BaseService
  extends Mixin(BaseServiceRestricted, BaseServiceReserved)
  implements ServiceAdapter {}
