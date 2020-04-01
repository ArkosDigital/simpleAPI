import ServiceModel from '../../models/serviceModel';
import ServiceSimpleModel from '../../models/serviceSimpleModel';

export default interface ServiceUpdateAdapter {
  update(id: string, content: ServiceSimpleModel): Promise<ServiceModel>;
}
