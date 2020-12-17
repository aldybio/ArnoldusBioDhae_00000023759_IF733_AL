import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { threadId } from 'worker_threads';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() txtEmail: string;
  @Input() txtPassword: string;

  constructor(
    private service : ServicesService,
    private route : Router,
    private toastController : ToastController
  ) { }

  ngOnInit() {
  }

  login(){
    if(!this.txtEmail || !this.txtPassword){
      this.presentToast("Peringatan!","Isilah semua kolom","danger");
      return;
    }
    else{
        const user = {
          email : this.txtEmail,
          password : this.txtPassword,
        }
        this.service.login(user)
        .then(res => {
          console.log(res);
          this.presentToast('Sukses!','Selamat Datang','primary');
          this.route.navigateByUrl('/tabs');
        }, err=> {
          this.presentToast('Peringatan!', err.message,'danger');
        })      
    }
  }

  async presentToast(header:any, message : any, color:any) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      color : color,
      position: 'bottom',
      duration: 1500
    });
    toast.present();
  }

  toRegis(){
    this.route.navigateByUrl('/register');
  }

  ionViewDidEnter(){
    this.txtEmail="";
    this.txtPassword="";
  }

}
