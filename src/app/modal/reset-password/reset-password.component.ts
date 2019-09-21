import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
declare const $ : any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  accessToken;
  resetpswForm: FormGroup;
  submitted = false;
  isDisable = false;
  passwordType: string = 'password';
  passwordIcon: string = 'ios-eye-off';
  match = false;
  show = false;
  show1 = false;
  show2 = false;

  constructor(public modalController: ModalController, public _userService: UserService, public _toastService: ToastService) {
    this.resetpswForm = new FormGroup({
      // emailId: new FormControl('', Validators.required),
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    });

  }

  ngOnInit() { }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  /**
   * Hide and show password
   */
  hideShowOldPassword() {
    this.show= !this.show;
    // this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    // this.passwordIcon = this.passwordIcon === 'ios-eye-off' ? 'ios-eye' : 'ios-eye-off';
  }
  hideShowNewPassword() {
    this.show1= !this.show1;
    // this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    // this.passwordIcon = this.passwordIcon === 'ios-eye-off' ? 'ios-eye' : 'ios-eye-off';
  }
  hideShowConformPassword() {
    this.show2= !this.show2;
    // this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    // this.passwordIcon = this.passwordIcon === 'ios-eye-off' ? 'ios-eye' : 'ios-eye-off';
  }

  /**
 * Compare password
 * @param form 
 */
  comparePassword(form) {
    console.log(form.value)
    console.log(form.value.newPassword == form.value.confirmPassword, this.match);
    if (form.value.newPassword === form.value.confirmPassword) {
      console.log("In true condition");
      this.match = true;
      $('#confirmPassword').css('border-color', 'green')
    } else {
      this.match = false;
      $('#confirmPassword').css('border-color', 'red')
    }
  }


  /**
  * Reset Password 
  * @param {object} data 
  */
  resetPassword(data) {
    this.submitted = true;
    if (this.resetpswForm.invalid) {
      return;
    }
    this.isDisable = true;
    console.log('data===================>', data);
    this._userService.resetPassword(data).subscribe((res: any) => {
      console.log("response in reset pwd============>", res);
      this._toastService.presentToast(res.message)
      this.isDisable = false;
      this.resetpswForm.reset();
      this.modalController.dismiss({
        'dismissed': true
      });
    }, err => {
      console.log('err===============>', err);
      this._toastService.presentToast(err.error.message);
      this.isDisable = false;
      this.resetpswForm.reset();
    })
  }

}
