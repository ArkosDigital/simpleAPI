import { Request, Response } from 'express';
import { ServiceModel, ServiceSimpleModel } from '@flexiblepersistence/service';
import BaseControllerDefault from './baseControllerDefault';
import ControllerUpdateAdapter from '../adapter/controllerUpdateAdapter';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseControllerUpdate extends BaseControllerDefault
  implements ControllerUpdateAdapter {
  protected async updateElement(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    return (await this.service('update', id, content))[0];
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const content = req.body as ServiceSimpleModel;
      const object = {};
      if (this.element)
        object[this.element] = await this.updateElement(id, content);
      else
        throw new Error("Element is not specified.");
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}
