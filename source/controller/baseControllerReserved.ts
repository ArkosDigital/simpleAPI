import ControllerReservedAdapter from '../adapter/controllerReservedAdapter';
import { Mixin } from 'ts-mixer';
import BaseControllerStore from './baseControllerStore';
import BaseControllerDelete from './baseControllerDelete';
import BaseControllerUpdate from './baseControllerUpdate';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseControllerReserved
  // @ts-ignore
  extends Mixin(BaseControllerStore, BaseControllerDelete, BaseControllerUpdate)
  implements ControllerReservedAdapter { }
