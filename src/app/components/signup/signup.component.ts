import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  private name;
  private id;
  private email;
  private password;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  ngOnInit() {}

  async signup() {
    if (this.name && this.id && this.email && this.password) {
      if (this.password.length < 6) {
        console.log("papi mayor a 6");
      }
      // Validar todo
      let {
        user: { uid }
      } = await this.auth.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      const ref = this.db.object(`users/${uid}`);
      await ref.update({ name: this.name, email: this.email, cedula: this.id });
      this.router.navigate(["/login"]);
    }
  }
}
