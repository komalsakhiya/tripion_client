import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-upgrade-to-premium',
  templateUrl: './upgrade-to-premium.component.html',
  styleUrls: ['./upgrade-to-premium.component.scss'],
})
export class UpgradeToPremiumComponent implements OnInit {

  constructor(public modalController: ModalController, ) {

  }

  ngOnInit() {

  }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
