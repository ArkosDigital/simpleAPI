import ServiceModel from '../../models/serviceModel';

export default interface ServiceSelectAdapter {
  select(filter): Promise<Array<ServiceModel>>;
}
