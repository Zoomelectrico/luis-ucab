import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "app-error404",
  templateUrl: "./error404.component.html",
  styleUrls: ["./error404.component.css"]
})
export class Error404Component implements OnInit {
  constructor(public auth: AngularFireAuth) {}

  ngOnInit() {
    this.auth.user.subscribe(async currentUser => {
      if (currentUser) {
        localStorage.setItem("auth", "false");
        await this.auth.auth.signOut();
      }
    });
  }
}
