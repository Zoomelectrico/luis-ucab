import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  public name;
  public phone;
  public address;
  public email;
  public password;
  public cedula;
  public message: string;

  constructor(
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public router: Router
  ) {}

  ngOnInit() {}

  async signup() {
    const validate =
      this.name && this.phone && this.email && this.password && this.address;
    if (validate) {
      if (this.password.length < 6) {
        this.message = "La contrasema debe tener al menos 6 caracteres";
      }
      try {
        const {
          user: { uid }
        } = await this.auth.auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        if (uid) {
          const ref = this.db.object(`users/${uid}`);
          await ref.update({
            name: this.name,
            email: this.email,
            telefono: this.phone,
            direccion: this.address,
            cedula: this.cedula,
            tipo: "cliente"
          });
          this.router.navigate(["/login"]);
        } else {
          this.message = "ya estas registrado";
        }
      } catch (e) {
        this.message = "Error en el sistema";
      }
    } else {
      this.message = "Debe ingresar todos los campos";
    }
  }
}
