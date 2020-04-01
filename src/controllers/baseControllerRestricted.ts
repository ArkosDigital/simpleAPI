import BaseControllerShow from './baseControllerShow';
import ControllerRestrictedAdapter from '../interfaces/controller/controllerRestrictedAdapter';
import BaseControllerIndex from './baseControllerIndex';
import { Mixin } from 'ts-mixer';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseControllerRestricted
  extends Mixin(BaseControllerShow, BaseControllerIndex)
  implements ControllerRestrictedAdapter {}
