import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Post } from '../models/post.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  post = {} as Post;

  constructor(private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore) { }

  ngOnInit() { }

  async createPost(post: Post){

    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espere un momento por favor..."
      });
      await loader.present();
      
      try {
        await this.firestore.collection("posts").add(post);      
                        
      } catch (e:any) {
        e.message = "Mensaje de error en post";
        let errorMessage = e.message || e.getLocalizedMessage();
        
        this.showToast(errorMessage);     
      }

      await loader.dismiss();

      this.navCtrl.navigateRoot("home");
    
    }

    

  }

  formValidation() {
    if (!this.post.title) {
      this.showToast("Ingrese un titulo");
      return false;
    }

    if (!this.post.details) {
      this.showToast("Ingrese una descripción");
      return false;
    }

    return true;
  }
  

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 5000 // Aumenta la duración del mensaje a 5 segundos
    }).then(toastData => toastData.present());
  }


}
