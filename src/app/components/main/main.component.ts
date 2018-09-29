import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public router: Router
  ) {}

  ngOnInit() {
    this.auth.auth.onAuthStateChanged(
      user => {
        this.db
          .object(`users/${user.uid}`)
          .valueChanges()
          .subscribe((user: any) => {
            const { tipo } = user;
            this.router.navigate([
              `/${tipo === "cliente" ? "client" : "admin"}`
            ]);
          });
      },
      err => {
        console.log(err);
      }
    );
  }
}
