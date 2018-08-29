import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireDatabase, snapshotChanges } from "angularfire2/database";
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
  private licensePlate;
  private transport: Array<Object> = [];
  private message: string = "";

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.db
      .list("transportes")
      .snapshotChanges()
      .subscribe(snapshot => {
        snapshot.forEach(data => {
          const t = {
            ...data.payload.val(),
            placa: data.key
          };
          this.transport = [...this.transport, t];
          console.table(this.transport);
        });
      });
  }

  onclick(i) {
    const listItems = this.lista.nativeElement.childNodes;
    listItems.forEach(li => {
      li.classList = [];
    });
    this.ngifs.fill(false);
    listItems[i].classList = ["is-active"];
    this.ngifs[i] = true;
  }

  search(trackingCode) {
    this.db
      .object(`encomiendas/${trackingCode}`)
      .valueChanges()
      .subscribe(data => {
        this.map = new google.maps.Map(this.gmapElement.nativeElement, {
          center: new google.maps.LatLng(
            data["lugarParticular"].lat,
            data["lugarParticular"].lon
          ),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        console.log(data);
      });
  }

  newEncomienda(emisor, receptor) {
    this.db
      .list("users")
      .snapshotChanges()
      .subscribe(snapshot => {
        let rep = "";
        let emi = "";
        snapshot.forEach((x, i) => {
          if (x.payload.val()["cedula"] == receptor) {
            rep = x.key;
          } else if (x.payload.val()["cedula"] == emisor) {
            emi = x.key;
          }
          if (i === snapshot.length - 1) {
            const encomienda = {
              fechaRecepcion: new Date().toUTCString(),
              remitente: emi,
              receptor: rep,
              status: 1,
              trackingID: ""
            };
            const key = this.db.list("encomiendas").push(encomienda).key;
            this.db.object(`encomiendas/${key}`).update({ trackingID: key });
            this.message = `Codigo de Tracking ${key}`;
          }
        });
      });
  }
}
