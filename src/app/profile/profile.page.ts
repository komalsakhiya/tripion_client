import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResetPasswordComponent } from '../modal/reset-password/reset-password.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public modalController: ModalController,public _userService:UserService) {

  }

  ngOnInit() {

  }
  /**
   * Open Modal
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: ResetPasswordComponent
    });
    return await modal.present();
  }

}
