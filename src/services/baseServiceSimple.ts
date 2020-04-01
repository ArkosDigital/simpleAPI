import ServiceModel from '../models/serviceModel';
import ServiceSimpleAdapter from '../interfaces/service/serviceSimpleAdapter';

export default abstract class BaseServiceSimple
  implements ServiceSimpleAdapter {
  protected abstract async selectAllElements(): Promise<Array<ServiceModel>>;

  public async selectAll(): Promise<Array<ServiceModel>> {
    const result = await this.selectAllElements();
    return result;
  }
}
