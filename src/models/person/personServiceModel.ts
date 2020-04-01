import ServiceModel from '../serviceModel';
import IdentificationServiceModel from '../identification/identificationServiceModel';
import PermissionServiceModel from '../permission/permissionServiceModel';

export default interface PersonServiceModel extends ServiceModel {
  name: string;
  identifications?: Array<IdentificationServiceModel>;
  permissions?: Array<PermissionServiceModel>;
  sponsor?: PersonServiceModel;
}
