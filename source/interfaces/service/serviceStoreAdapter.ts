import ServiceModel from '../../models/serviceModel';
import ServiceSimpleModel from '../../models/serviceSimpleModel';

export default interface ServiceStoreAdapter {
  store(content: ServiceSimpleModel): Promise<ServiceModel>;
}
