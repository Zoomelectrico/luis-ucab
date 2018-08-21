import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

@Component({
  selector: "app-admin-db",
  templateUrl: "./admin-db.component.html",
  styleUrls: ["./admin-db.component.css"]
})
export class AdminDBComponent implements OnInit {
  @ViewChild("lista")
  private lista: any;
  @ViewChild("gmap")
  private gmapElement: any;
  private map: google.maps.Map;
  private ngifs = [true, false, false, false];
  private trackingCode;
  private licensePlate;
  private mapProp = {
    center: new google.maps.LatLng(18.5793, 73.8143),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {}

  onclick(i) {
    const listItems = this.lista.nativeElement.childNodes;
    listItems.forEach(li => {
      li.classList = [];
    });
    this.ngifs.fill(false);
    listItems[i].classList = ["is-active"];
    this.ngifs[i] = true;
  }

  search() {
    this.map = new google.maps.Map(
      this.gmapElement.nativeElement,
      this.mapProp
    );
    this.db
      .object(`encomiendas/${this.trackingCode}`)
      .valueChanges()
      .subscribe(data => {
        console.log(data);
      });
  }
}
