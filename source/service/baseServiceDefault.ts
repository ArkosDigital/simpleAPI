/* eslint-disable @typescript-eslint/no-explicit-any */
import { Journaly } from 'journaly';
import { settings } from 'ts-mixer';
settings.initFunction = 'init';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseServiceDefault {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected journaly: Journaly<any>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected element: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handler: any;
  protected init(handler, journaly: Journaly<any>): void {
    this.handler = handler;
    this.journaly = journaly;
    this.element = this.constructor.name;
  }
}
