import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPagePageRoutingModule } from './edit-page-routing.module';

import { EditPagePage } from './edit-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPagePageRoutingModule
  ],
  declarations: [EditPagePage]
})
export class EditPagePageModule {}
