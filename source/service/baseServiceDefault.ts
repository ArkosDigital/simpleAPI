import { Journaly } from 'journaly';
export default abstract class BaseServiceDefault {
  protected journaly: Journaly;
  protected abstract element: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handler: any;

  protected abstract className: string;
  constructor(handler, journaly: Journaly) {
    this.handler = handler;
    this.journaly = journaly;
  }
}
