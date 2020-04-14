import { Mixin, settings } from 'ts-mixer';
import ServiceReservedAdapter from '../adapter/controller/controllerReservedAdapter';
import BaseServiceStore from './baseServiceStore';
import BaseServiceDelete from './baseServiceDelete';
import BaseServiceUpdate from './baseServiceUpdate';
// import { Journaly } from 'journaly';
// settings.initFunction = 'init';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseServiceReserved
  extends Mixin(BaseServiceStore, BaseServiceDelete, BaseServiceUpdate)
  implements ServiceReservedAdapter {
  // protected init(handler, journaly: Journaly<any>): void {
  //   super.init(handler, journaly);
  // }
}
