import { Mixin, settings } from 'ts-mixer';
import ServiceAdapter from '../adapter/service/serviceAdapter';
import BaseServiceRestricted from './baseServiceRestricted';
import BaseServiceReserved from './baseServiceReserved';
import { Journaly } from 'journaly';
settings.initFunction = 'init';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseService
  extends Mixin(BaseServiceRestricted, BaseServiceReserved)
  implements ServiceAdapter {
  protected init(handler, journaly: Journaly<any>): void {
    super.init(handler, journaly);
  }
}
