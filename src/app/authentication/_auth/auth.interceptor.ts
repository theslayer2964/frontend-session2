import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {UserAuthService} from "../_service/user-auth.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuthService: UserAuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get("No-Auth") === 'True') {
      return next.handle(req.clone())
    }
    const token = this.userAuthService.getToken();
    req = this.addToken(req, token);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['/login'])
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden'])
        }
        return throwError('Something is wrong')
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: any) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
