import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  loginBtn: boolean = true;

  constructor(public afAuth: AngularFireAuth, public router: Router) {}

  async logout() {
    localStorage.setItem("auth", "false");
    this.loginBtn = true;
    await this.afAuth.auth.signOut();
    this.router.navigate(["/"]);
  }

  ngOnInit() {
    if (localStorage.getItem("auth") === "true") {
      this.loginBtn = false;
    }
  }
}
