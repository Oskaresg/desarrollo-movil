import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {  
    
  posts:any;
  
  constructor( 
    private loadingCtrl: LoadingController,    
    private toastCtrl: ToastController,
    private firestore : AngularFirestore
    ) {}

  ionViewWillEnter(){
    this.getPosts();
  }

  async getPosts(){
    let loader = await this.loadingCtrl.create({
      message: "Espere un momento estamos trabajando en cargar su infomacion..."
    });
    await loader.present();

    try {
      this.firestore.collection('posts')
        .snapshotChanges()
        .subscribe((data:any[]) =>{

          this.posts = data.map((e:any) =>{
            return{
              id: e.payload.doc.id,
              title: e.payload.doc.data()["title"],
              details: e.payload.doc.data()["details"]
          }
        });
      }); 
      
      await loader.dismiss();
    } catch (e:any) {
      e.message = "hay un error en el inicio";
      let errorMessage = e.message || e.getLocalizedMessage();
        
        this.showToast(errorMessage); 
    }
  }

  async deletePost(id: string){    
    let loader = await this.loadingCtrl.create({
      message: "Espere un momento estamos trabajando en cargar su infomacion..."
    });
    await loader.present();

    await this.firestore.doc("posts/"+id).delete();

    await loader.dismiss();  
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 6000 // Aumenta la duración del mensaje a 6 segundos
    }).then(toastData => toastData.present());
  }
}
