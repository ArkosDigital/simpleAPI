import ServiceSimpleAdapter from './serviceSimpleAdapter';
import ServiceModel from '../../models/serviceModel';
import ServiceSimpleModel from '../../models/serviceSimpleModel';

export default interface ServiceAdapter extends ServiceSimpleAdapter {
  selectById(id: string): Promise<ServiceModel>;

  store(content: ServiceSimpleModel): Promise<ServiceModel>;

  update(id: string, content: ServiceSimpleModel): Promise<ServiceModel>;

  delete(id: string): Promise<boolean>;
}
