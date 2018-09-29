import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-admin-db",
  templateUrl: "./admin-db.component.html",
  styleUrls: ["./admin-db.component.css"]
})
export class AdminDBComponent implements OnInit {
  @ViewChild("lista")
  public lista: any;
  @ViewChild("gmap")
  public gmapElement: any;
  public select: any;
  public map: google.maps.Map;
  public ngifs = [true, false, false, false];
  public licensePlate;
  public encomiendas: Array<Object> = [];
  public transport: Array<Object> = [];
  public message: string = "";

  constructor(public db: AngularFireDatabase) {}

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
          t["latS"] = this.translateToDecimal(t["lat"]);
          t["lonS"] = "-" + this.translateToDecimal(t["lon"]);
          this.transport = [...this.transport, t];
        });
      });
    this.db
      .list("encomiendas")
      .snapshotChanges()
      .subscribe(snapshot => {
        snapshot.forEach(data => {
          this.db
            .object(`ubicacionGPS/${data.key}`)
            .snapshotChanges()
            .subscribe(data2 => {
              const payload = data2.payload.val();
              if (payload["camion"] === "none") {
                const e = {
                  key: data.key,
                  ...data2.payload.val()
                };
                this.encomiendas = [...this.encomiendas, e];
              }
            });
        });
      });
  }

  onclick(i) {
    this.message = "";
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
      .object(`ubicacionGPS/${trackingCode}`)
      .valueChanges()
      .subscribe(data => {
        if (data) {
          this.map = new google.maps.Map(this.gmapElement.nativeElement, {
            center: new google.maps.LatLng(
              data["latitud"],
              data["longitud"] * -1
            ),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(
              data["latitud"],
              data["longitud"] * -1
            ),
            map: this.map
          });
        } else {
          this.message = `Ese Identificar no se encuentra registrado`;
        }
      });
  }

  async despachar(e: any) {
    await this.db.object(`ubicacionGPS/${e.key}`).update({
      camion: this.select
    });
    this.encomiendas = this.encomiendas.filter(en => en["key"] != e.key);
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
              status: 0,
              trackingID: ""
            };
            const key = this.db.list("encomiendas").push(encomienda).key;
            this.db.object(`encomiendas/${key}`).update({ trackingID: key });
            this.message = `Codigo de Tracking ${key}`;
            let ubicacionGPS = {};
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(pos => {
                const {
                  coords: { latitude: latitud, longitude: longitud }
                } = pos;
                ubicacionGPS = {
                  camion: "none",
                  latitud,
                  longitud,
                  lugar: {
                    lat: latitud,
                    lon: longitud
                  }
                };
                this.db.object(`ubicacionGPS/${key}`).update(ubicacionGPS);
              });
            } else {
              ubicacionGPS = {
                camion: "none",
                latitud: "",
                longitud: "",
                lugar: {
                  lat: "",
                  lon: ""
                }
              };
              this.db.object(`ubicacionGPS/${key}`).update(ubicacionGPS);
            }
          }
        });
      });
  }

  public translateToDecimal(coordenada: string): string {
    const cor: string = coordenada
      .split("g")
      .join("-")
      .split("m")
      .join("-")
      .split("s")
      .join("-")
      .split("mili")
      .join("-");
    const corArray: Array<string> = cor.split("-");
    const total: number =
      parseFloat(corArray[0]) +
      parseFloat(corArray[1]) / 60 +
      parseFloat(corArray[2]) / 3600;
    return total.toFixed(4);
  }

  verTransporte(t: any) {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: new google.maps.LatLng(
        parseFloat(t["latS"]),
        parseFloat(t["lonS"])
      ),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        parseFloat(t["latS"]),
        parseFloat(t["lonS"])
      ),
      map: this.map
    });
  }
}
