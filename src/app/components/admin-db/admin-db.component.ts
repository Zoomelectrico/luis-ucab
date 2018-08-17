import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-admin-db",
  templateUrl: "./admin-db.component.html",
  styleUrls: ["./admin-db.component.css"]
})
export class AdminDBComponent implements OnInit {
  @ViewChild("lista")
  private lista: any;
  private ngifs = [true, false, false, false];

  constructor() {}

  ngOnInit() {}

  onclick(i) {
    const listItems = this.lista.nativeElement.childNodes;
    listItems.forEach((li, i) => {
      li.classList = [];
    });
    this.ngifs.fill(false);
    listItems[i].classList = ["is-active"];
    this.ngifs[i] = true;
  }
}
