import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {

  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  async login(user: User) {
    
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espere un momento estamos trabajando en cargar su infomacion..."
      });
      await loader.present();

     
      try {
        await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(data =>{
          console.log(data);

          this.navCtrl.navigateRoot("home");
        })
        
      } catch (e:any) {
        e.message = "Usuario aun no esta registrado";
        let errorMessage = e.message || e.getLocalizedMessage();
        
        this.showToast(errorMessage);     
      }

      await loader.dismiss();
    }
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast("Ingrese un correo por favor");
      return false;
    }

    if (!this.user.password) {
      this.showToast("Ingrese una contraseña por favor");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 6000 // Aumenta la duración del mensaje a 6 segundos
    }).then(toastData => toastData.present());
  }

}
