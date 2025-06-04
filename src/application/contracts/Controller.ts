export interface IController<TBody = undefined> {
  handle(params: IController.Request): Promise<IController.Response<TBody>>
}

export namespace IController {
  export type Request<
    Tbody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>> = {
      body: Tbody;
      params: TParams;
      queryParams: TQueryParams;
    }

  export type Response<TBody = undefined> = {
    statusCode: number;
    body?: TBody;
  }

}
