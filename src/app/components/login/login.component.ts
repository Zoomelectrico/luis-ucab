import { Component, OnInit } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private email;
  private password;

  constructor(public afAuth: AngularFireAuth) {}

  async login() {
    console.log(this.email);
    console.log(this.password);
    let result;
    try {
      result = await this.afAuth.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      if (result) {
        localStorage.setItem("auth", "true");
      }
    } catch (e) {
      localStorage.setItem("auth", "false");
    }
  }

  ngOnInit() {}
}
