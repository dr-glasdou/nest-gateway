import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
      const status = Number(rpcError.status) || 400;
      return response.status(status).json(rpcError);
    }

    return response.status(400).json({
      statusCode: 400,
      message: rpcError,
    });
  }
}
