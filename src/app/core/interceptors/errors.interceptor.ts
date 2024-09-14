import { error } from 'node:console';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  let _ToastrService = inject(ToastrService)


  return next(req).pipe(catchError((err)=>{

    console.log('interCeptor Error',err.error.massege);
    _ToastrService.error(err.error.message,'Fresh Cart')

    return throwError (()=>  err)
  }));
};
