export default abstract class BaseServiceDefault {
  protected abstract element: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handler: any;
  constructor(handler) {
    this.handler = handler;
  }
}
