import { Mixin } from 'ts-mixer';
import ServiceReservedAdapter from '../adapter/controller/controllerReservedAdapter';
import BaseServiceStore from './baseServiceStore';
import BaseServiceDelete from './baseServiceDelete';
import BaseServiceUpdate from './baseServiceUpdate';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseServiceReserved
  extends Mixin(BaseServiceStore, BaseServiceDelete, BaseServiceUpdate)
  implements ServiceReservedAdapter {}
