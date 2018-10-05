import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "./components/main/main.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { AdminDBComponent } from "./components/admin-db/admin-db.component";
import { ClientDBComponent } from "./components/client-db/client-db.component";
import { Error404Component } from "./components/error404/error404.component";

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
  },
  {
    path: "404",
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
