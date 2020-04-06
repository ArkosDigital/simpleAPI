import ServiceDeleteAdapter from '../adapter/service/serviceDeleteAdapter';
import BaseServiceDefault from './baseServiceDefault';
import { Event, Operation } from 'flexiblepersistence';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseServiceDelete extends BaseServiceDefault
  implements ServiceDeleteAdapter {
  protected initJournaly(): void {
    console.log('delete:', this.element);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;
    _self.journaly.subscribe(this.element + '.' + 'delete', _self.delete);
    _self.journaly.subscribe(
      this.element + '.' + 'deleteElement',
      _self.deleteElement
    );
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
