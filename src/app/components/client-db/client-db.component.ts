/// <reference types="googlemaps" />
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-client-db",
  templateUrl: "./client-db.component.html",
  styleUrls: ["./client-db.component.css"]
})
export class ClientDBComponent implements OnInit {
  @ViewChild("gmap")
  private gmapElement: any;
  private map: google.maps.Map;

  constructor() {}

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
}
