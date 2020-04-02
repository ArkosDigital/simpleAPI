import ServiceModel from '../model/serviceModel';
import ServiceSelectAllAdapter from '../adapter/service/serviceSelectAllAdapter';

export default class BaseServiceSelectAll implements ServiceSelectAllAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async selectAllElements(): Promise<Array<ServiceModel>>;

  public async selectAll(): Promise<Array<ServiceModel>> {
    const result = await this.selectAllElements();
    return result;
  }
}
