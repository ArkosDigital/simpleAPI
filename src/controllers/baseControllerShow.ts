import { Request, Response } from 'express';
import ServiceModel from '../models/serviceModel';
import ControllerShowAdapter from '../interfaces/controller/controllerShowAdapter';
import BaseControllerDefault from './baseControllerDefault';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseControllerShow extends BaseControllerDefault
  implements ControllerShowAdapter {
  // @ts-ignore
  protected abstract selectAll(filter?: unknown): Promise<Array<ServiceModel>>;

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const object = {};
      const filter = req.params as {};
      object[this.elements] = await this.selectAll(filter);
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}
