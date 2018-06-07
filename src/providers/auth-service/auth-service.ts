import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

export class User {
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(public storage: Storage){};

    public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
       /* se non viene inserito nulla viene un messaggio che
       chiede di inserire le credenziali
       */
    } else {
      return Observable.create(observer => {
      this.storage.get(credentials.email).then((password) => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === password);
        //controlla se la password e uguale
        if(access){
        this.currentUser = new User(credentials.email);
        }
        observer.next(access);
        observer.complete();
      });
      });
    }
  }


  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      this.storage.set(credentials.email,credentials.password);
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
