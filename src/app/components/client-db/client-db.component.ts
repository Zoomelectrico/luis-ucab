/// <reference types="googlemaps" />
import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-client-db",
  templateUrl: "./client-db.component.html",
  styleUrls: ["./client-db.component.css"]
})
export class ClientDBComponent implements OnInit {
  @ViewChild("gmap")
  private gmapElement: any;
  private map: google.maps.Map;
  private user: object;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {}

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.auth.user.subscribe(async currentUser => {
      let { uid } = currentUser;
      let res = await this.db
        .object(`users/${uid}`)
        .valueChanges()
        .subscribe(data => {
          this.user = data;
        });
    });
  }
}
