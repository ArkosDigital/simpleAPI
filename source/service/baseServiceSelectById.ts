import ServiceModel from '../model/serviceModel';
import ServiceSelectByIdAdapter from '../adapter/service/serviceSelectByIdAdapter';
import BaseServiceDefault from './baseServiceDefault';
import { settings } from 'ts-mixer';
import { Journaly } from 'journaly';
settings.initFunction = 'init';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseServiceSelectById extends BaseServiceDefault
  implements ServiceSelectByIdAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async selectElementById(id: string): Promise<ServiceModel>;

  public async selectById(id: string): Promise<ServiceModel> {
    const result = await this.selectElementById(id);
    return result;
  }

  protected init(handler, journaly: Journaly<any>): void {
    super.init(handler, journaly);
    console.log('store:', this.element);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // this.journaly.subscribe(this.element + '.' + 'selectById', this.selectById);
    // this.journaly.subscribe(
    //   this.element + '.' + 'selectElementById',
    //   this.selectElementById
    // );
  }
}
