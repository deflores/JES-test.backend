import { BaseModel } from "./baseModel.js";

export class FiscaliaModel extends BaseModel {
  id;
  nombre;
  direccion;
  telefono;

  constructor() {
    super("fiscalias", ["id", "nombre", "direccion", "telefono"]);
  }

  get id() {
    return this.id;
  }

  get nombre() {
    return this.nombre;
  }
  get direccion() {
    return this.direccion;
  }
  get telefono() {
    return this.telefono;
  }
  ///
  set id(value) {
    this.id = value;
  }

  set nombre(value) {
    this.nombre = value;
  }
  set direccion(value) {
    this.direccion = value;
  }
  set telefono(value) {
    this.telefono = value;
  }
}
