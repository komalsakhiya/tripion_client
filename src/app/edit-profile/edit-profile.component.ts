import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { ResetPasswordComponent } from '../modal/reset-password/reset-password.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userDetail;
  editProfileForm: FormGroup;

  constructor(public modalController: ModalController,private route: ActivatedRoute, private router: Router, public _toastServices: ToastService,public _userService:UserService) {
    // console.log("edit profile componant=========>", navParams.get('id'));
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userDetail = this.router.getCurrentNavigation().extras.state.user;
        console.log('data in edit profile=====>', this.userDetail)
      }
    });

    this.editProfileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      contact: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
    });

  }

  ngOnInit() { }

  /**
   * Open Modal
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: ResetPasswordComponent
    });
    return await modal.present();
  }


  /**
   * Edit Profile
   * @param {Object} data 
   */
  editProfile(data) {
    console.log("data", data);
    this._userService.editProfile(data).subscribe((res:any)=>{
      console.log("res=====>",res);
      this.router.navigateByUrl('home/profile');
      // this.router.navigate(['home/profile']);
    },err=>{
      console.log(err);
    })
  }
}
