import { Mixin } from 'ts-mixer';
import ServiceAdapter from '../adapter/service/serviceAdapter';
import BaseServiceRestricted from './baseServiceRestricted';
import BaseServiceReserved from './baseServiceReserved';
import { Journaly } from 'journaly';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseService
  extends Mixin(BaseServiceRestricted, BaseServiceReserved)
  implements ServiceAdapter {
  protected className: string = this.constructor.name;
  constructor(handler, journaly: Journaly) {
    super(handler, journaly);
  }
}
