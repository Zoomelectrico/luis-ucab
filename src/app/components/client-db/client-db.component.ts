/// <reference types="googlemaps" />
import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

@Component({
  selector: "app-client-db",
  templateUrl: "./client-db.component.html",
  styleUrls: ["./client-db.component.css"]
})
export class ClientDBComponent implements OnInit {
  @ViewChild("gmap")
  private gmapElement: any;
  private map: google.maps.Map;
  private user: Object = {};
  private send: Array<Object> = [];
  private recive: Array<Object> = [];

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {}

  ngOnInit() {
    let lat = 18.5793;
    let lon = 73.8143;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const mapProp = {
            center: new google.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude
            ),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(
            this.gmapElement.nativeElement,
            mapProp
          );
        },
        err => {
          const mapProp = {
            center: new google.maps.LatLng(lat, lon),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(
            this.gmapElement.nativeElement,
            mapProp
          );
        }
      );
    } else {
      const mapProp = {
        center: new google.maps.LatLng(lat, lon),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
    this.auth.user.subscribe(currentUser => {
      const { uid } = currentUser;
      this.user = currentUser;
      this.db
        .object(`users/${uid}`)
        .valueChanges()
        .subscribe(data => {
          this.user = data;
        });
      this.db
        .list("encomiendas")
        .valueChanges()
        .subscribe(encomiendas => {
          encomiendas.forEach(encomienda => {
            if (encomienda["remitente"] === uid) {
              this.send = [...this.send, encomienda];
            } else if (encomienda["receptor"] === uid) {
              this.recive = [...this.recive, encomienda];
            }
          });
        });
    });
  }

  verEncomienda(e) {
    this.map.setCenter(
      new google.maps.LatLng(e.lugarParticular.lat, e.lugarParticular.lon)
    );
    console.log(e);
  }
}
