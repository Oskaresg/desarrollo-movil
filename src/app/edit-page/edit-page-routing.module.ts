import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPagePage } from './edit-page.page';

const routes: Routes = [
  {
    path: '',
    component: EditPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPagePageRoutingModule {}
