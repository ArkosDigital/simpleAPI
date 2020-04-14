import ServiceRestrictedAdapter from '../adapter/controller/controllerRestrictedAdapter';
import BaseServiceSelectById from './baseServiceSelectById';
import BaseServiceSelectAll from './baseServiceSelectAll';
import { Mixin, settings } from 'ts-mixer';
// import { Journaly } from 'journaly';
// settings.initFunction = 'init';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseServiceRestricted
  extends Mixin(BaseServiceSelectById, BaseServiceSelectAll)
  implements ServiceRestrictedAdapter {
  // protected init(handler, journaly: Journaly<any>): void {
  //   super.init(handler, journaly);
  // }
}
