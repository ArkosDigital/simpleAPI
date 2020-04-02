import ControllerAdapter from '../adapter/controller/controllerAdapter';
import BaseControllerRestricted from './baseControllerRestricted';
import BaseControllerReserved from './baseControllerReserved';
import { Mixin } from 'ts-mixer';

/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseController
  extends Mixin(BaseControllerReserved, BaseControllerRestricted)
  implements ControllerAdapter {}
