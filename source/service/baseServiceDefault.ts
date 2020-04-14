/* eslint-disable @typescript-eslint/no-explicit-any */
import { Journaly } from 'journaly';
import { settings } from 'ts-mixer';
settings.initFunction = 'init';
export default abstract class BaseServiceDefault {
  protected journaly;
  protected element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handler: any;
  protected init(handler, journaly: Journaly<any>): void {
    this.handler = handler;
    this.journaly = journaly;
    this.element = this.constructor.name;
  }

  // constructor(handler, journaly: Journaly<any>) {
  //   this.handler = handler;
  //   this.journaly = journaly;
  //   this.element = this.constructor.name;
  // }
}
