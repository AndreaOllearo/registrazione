import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createSuccess = false;
  registerCredentials = { email: '', password: '', confirmation_password: '' };

  constructor(
    private nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController
  ) {}

  public register() {
    if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
      //confronta se le credenziali della password siano uguali a quelle del controllo
      this.showPopup("Error", 'The password confirmation does not match.');
    } else {
      this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account creat0.");
          // conferma la creazione dell'account
        } else {
          this.showPopup("Error", "Problemi nella creazione dell'account.");
          // l'account non e stato creato per problemi
        }
      },
        error => {
          this.showPopup("Error", error);
          //rida un messaggio di errore nel caso ci siano problemi
        });
    }
  }

  showPopup(title, text) {
    //crea una finestra che conferma che l'account e stato creato
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
