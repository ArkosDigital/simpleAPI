import ServiceRestrictedAdapter from '../interfaces/controller/controllerRestrictedAdapter';
import BaseServiceSelectById from './baseServiceSelectById';
import BaseServiceSelectAll from './baseServiceSelectAll';
import { Mixin } from 'ts-mixer';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseServiceRestricted
  extends Mixin(BaseServiceSelectById, BaseServiceSelectAll)
  implements ServiceRestrictedAdapter {}
