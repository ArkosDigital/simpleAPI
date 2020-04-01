import ServiceSimpleModel from '../serviceSimpleModel';
import IdentificationServiceSimpleModel from '../identification/identificationServiceSimpleModel';
import PermissionServiceMinimalModel from '../permission/permissionServiceMinimalModel';

export default interface PersonServiceSimpleModel extends ServiceSimpleModel {
  name: string;
  identifications?: Array<IdentificationServiceSimpleModel>;
  permissions?: Array<PermissionServiceMinimalModel>;
  sponsor_id?: string;
}
