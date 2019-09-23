import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomePage } from './home.page';
import { ProfilePage } from '../profile/profile.page';
import { AboutPage } from '../about/about.page';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { CurrencyConverterComponent } from '../currency-converter/currency-converter.component';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          },
          {
            path: 'profile',
            component: ProfilePage
          },
          {
            path: 'about',
            component: AboutPage
          },
          {
            path: 'edit-profile',
            component: EditProfileComponent
          },
          {
            path: 'currency-converter',
            component: CurrencyConverterComponent
          }
        ]
      }
    ])
  ],
  declarations: [
    HomePage,
    ProfilePage,
    AboutPage,
    EditProfileComponent,
    CurrencyConverterComponent
  ],
})
export class HomePageModule { }
