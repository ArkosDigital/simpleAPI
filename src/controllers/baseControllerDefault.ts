/* eslint-disable @typescript-eslint/ban-ts-ignore */
export default class BaseControllerDefault {
  protected errorStatus: {
    [error: string]: number;
  } = { Error: 400, error: 403, TypeError: 403, RemoveError: 400 };
  // @ts-ignore
  protected abstract elements: string;
  // @ts-ignore
  protected abstract element: string;
}
