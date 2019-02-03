import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../const/const.service";
import {catchError, tap} from "rxjs/internal/operators";
import {HandleErrorService} from "../error/handle-error.service";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new User();
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  login(email: string, password: string){

    this.user.email = email;
    this.user.password = password;

    return this.http.post(`${BASE_URL}/login`, this.user)
      .pipe(
        tap(
          (data) => {console.log(data)},
          error => console.log(error)
        ),
        catchError(this.handleErrorService.handleError)
      );

  }
}
