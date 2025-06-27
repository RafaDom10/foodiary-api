import { getSchema } from '@kernel/decorators/schema';
import { z } from 'zod';

type TRouteType = 'public' | 'private'
export abstract class Controller<TType extends TRouteType, TBody = undefined> {
  protected schema?: z.ZodSchema;
  protected abstract handle(request: Controller.Request<TType>): Promise<Controller.Response<TBody>>;

  public execute(request: Controller.Request<TType>): Promise<Controller.Response<TBody>> {
    const body = this.validateBody(request.body);

    return this.handle({
      ...request,
      body,
    });
  }

  private validateBody(body: Controller.Request<TType>['body']) {
    const schema = getSchema(this);

    if (!schema) {
      return body;
    }

    return schema.parse(body);
  }

}

export namespace Controller {
  type BaseRequest<
    Tbody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>> = {
      body: Tbody;
      params: TParams;
      queryParams: TQueryParams;
    }

  type PublicRequest<
    Tbody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = BaseRequest<Tbody, TParams, TQueryParams> & {
    accountId: null
  }

  type PrivateRequest<
    Tbody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = BaseRequest<Tbody, TParams, TQueryParams> & {
    accountId: string
  }

  export type Request<
    TType extends TRouteType,
    Tbody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = TType extends 'public'
    ? PublicRequest<Tbody, TParams, TQueryParams>
    : PrivateRequest<Tbody, TParams, TQueryParams>;

  export type Response<TBody = undefined> = {
    statusCode: number;
    body?: TBody;
  }

}
