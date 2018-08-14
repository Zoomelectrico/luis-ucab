import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "./components/main/main.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { AdminDBComponent } from "./components/admin-db/admin-db.component";
import { ClientDBComponent } from "./components/client-db/client-db.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin",
    component: AdminDBComponent
  },
  {
    path: "client",
    component: ClientDBComponent
  },
  {
    path: "signup",
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
