import ServiceModel from '../model/serviceModel';
import ServiceSelectAllAdapter from '../adapter/service/serviceSelectAllAdapter';
import BaseServiceDefault from './baseServiceDefault';
import { settings } from 'ts-mixer';
import { Journaly } from 'journaly';
settings.initFunction = 'init';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseServiceSelectAll extends BaseServiceDefault
  implements ServiceSelectAllAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async selectAllElements(): Promise<Array<ServiceModel>>;
  public async selectAll(): Promise<Array<ServiceModel>> {
    const result = await this.selectAllElements();
    return result;
  }

  protected init(handler, journaly: Journaly<any>): void {
    super.init(handler, journaly);
    console.log('store:', this.element);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    this.journaly.subscribe(this.element + '.' + 'selectAll', this.selectAll);
    this.journaly.subscribe(
      this.element + '.' + 'selectAllElements',
      this.selectAllElements
    );
  }
}
