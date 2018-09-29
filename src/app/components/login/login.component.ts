import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public email;
  public password;

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    public db: AngularFireDatabase
  ) {}

  async login() {
    let result;
    try {
      result = await this.auth.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      if (result) {
        const {
          user: { uid }
        } = result;
        localStorage.setItem("auth", "true");
        this.db
          .object(`users/${uid}`)
          .valueChanges()
          .subscribe(
            data => {
              const tipo = data["tipo"];
              this.router.navigate([
                `/${tipo === "cliente" ? "client" : "admin"}`
              ]);
            },
            err => console.log(err)
          );
      }
    } catch (e) {
      localStorage.setItem("auth", "false");
    }
  }

  ngOnInit() {}
}
