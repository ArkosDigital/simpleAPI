import ControllerRestrictedAdapter from '../adapter/controller/controllerRestrictedAdapter';
import BaseControllerIndex from './baseControllerIndex';
import BaseControllerShow from './baseControllerShow';
import { Mixin } from 'ts-mixer';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseControllerRestricted
  // @ts-ignore
  extends Mixin(BaseControllerShow, BaseControllerIndex)
  implements ControllerRestrictedAdapter {}
