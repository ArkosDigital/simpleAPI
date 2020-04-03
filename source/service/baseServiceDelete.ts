import ServiceDeleteAdapter from '../adapter/service/serviceDeleteAdapter';
import BaseServiceDefault from './baseServiceDefault';
import { Event, Operation } from 'flexiblepersistence';
import { Journaly } from 'journaly';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseServiceDelete extends BaseServiceDefault
  implements ServiceDeleteAdapter {
  private initJournaly(): void {
    console.log('delete:', this.className);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;
    _self.journaly.subscribe(this.className + '.' + 'delete', (id: string) => {
      _self.delete(id);
    });
    _self.journaly.subscribe(
      this.className + '.' + 'deleteElement',
      (id: string) => {
        _self.deleteElement(id);
      }
    );
  }
  constructor(handler, journaly: Journaly) {
    super(handler, journaly);
    this.initJournaly();
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async deleteElement(id: string): Promise<boolean>;
  public async delete(id: string): Promise<boolean> {
    // Event Sourcing
    await this.handler.addEvent(
      new Event({
        operation: Operation.delete,
        name: this.element,
        selection: { _id: id },
      })
    );
    console.log('delete');

    const result = await this.deleteElement(id);
    return result;
  }
}
