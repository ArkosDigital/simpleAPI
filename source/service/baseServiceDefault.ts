/* eslint-disable @typescript-eslint/no-explicit-any */
import { Journaly } from 'journaly';
export default abstract class BaseServiceDefault {
  protected journaly: Journaly<any>;
  protected abstract element: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handler: any;
  protected abstract className: string;
  protected abstract initJournaly(): void;
  constructor(handler, journaly: Journaly<any>) {
    this.handler = handler;
    this.journaly = journaly;
    this.initJournaly();
  }
}
