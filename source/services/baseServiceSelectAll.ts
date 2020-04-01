import ServiceModel from '../models/serviceModel';
import ServiceSelectAllAdapter from '../interfaces/service/serviceSelectAllAdapter';

export default class BaseServiceSelectAll implements ServiceSelectAllAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async selectAllElements(): Promise<Array<ServiceModel>>;

  public async selectAll(): Promise<Array<ServiceModel>> {
    const result = await this.selectAllElements();
    return result;
  }
}
