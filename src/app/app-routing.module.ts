import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalComponent } from './components/technical/technical.component';

const routes: Routes = [
  {path:'', redirectTo:'technical', pathMatch : 'full'},
  { path: 'technical', component: TechnicalComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
