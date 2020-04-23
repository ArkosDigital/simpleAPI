/* eslint-disable @typescript-eslint/no-explicit-any */
import { Journaly } from 'journaly';
import { settings } from 'ts-mixer';
import { Handler } from 'flexiblepersistence';
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected handler: Handler;

  public constructor(handler: Handler, journaly: Journaly<any>) {
    this.handler = handler;
    this.journaly = journaly;
  }
  protected init(handler: Handler, journaly: Journaly<any>): void {
    this.element = this.constructor.name;
    this.handler = handler;
    this.journaly = journaly;
  }
}
