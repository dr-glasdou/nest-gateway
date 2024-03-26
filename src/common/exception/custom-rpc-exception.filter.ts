import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        statusCode: 500,
        message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

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
