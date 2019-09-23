import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResetPasswordComponent } from '../modal/reset-password/reset-password.component';
import { UpgradeToPremiumComponent } from '../modal/upgrade-to-premium/upgrade-to-premium.component';
import { UserService } from '../services/user.service';
import { Router, NavigationExtras } from '@angular/router';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userDetail;
  constructor(public modalController: ModalController,
    public _userService: UserService, public router: Router) {

  }

  ngOnInit() {
    this.getUserProfile();
  }
  /**
   * Open Modal
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: UpgradeToPremiumComponent
    });
    return await modal.present();
  }

  /**
   * Get user Profile
   */
  getUserProfile() {
    this._userService.getUserProfile().subscribe((res: any) => {
      this.userDetail = res.data[0];
      console.log('profile===========>', res);
    }, err => {
      console.log(err);
    })
  }
  /**
   * Edit Profile of user
   * @param {object} data 
   */
  editProfile(data) {
    console.log('in edit profile===>', data);
    // this._navCtrl.push('home/edit-profile', {data: data}); 
    let navigationExtras: NavigationExtras = {
      state: {
        user: data
      }
    };
    this.router.navigate(['home/edit-profile'], navigationExtras);
  }

}
