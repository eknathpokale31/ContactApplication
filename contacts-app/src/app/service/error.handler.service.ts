import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
              let message = '';
              if (error.error instanceof ErrorEvent) {
                message = error.error.message; // Client-side error
              } else {
                message = `Error: ${error.status} , Error: ${error.message} , Error Message: ${error.error.error}`; // Server-side error
              }
              return throwError(error);
            })
        );
    }
}
