import { BaseController } from "./baseController.js";
import { FiscaliaModel } from "./fiscaliaModel.js";

export class MPFiscaliasController extends BaseController {
  constructor(req, res) {
    super(req, res);
  }

  get() {
    var model = new FiscaliaModel();
    model.findAll(this.responseCallback);
  }
  getById(id) {
    var model = new FiscaliaModel();
    model.findById(id, this.responseCallback);
  }

  crear(dto) {
    var model = new FiscaliaModel();
    model.id = dto.id;
    model.nombre = dto.nombre;
    model.direccion = dto.direccion;
    model.telefono = dto.telefono;
    model.save(this.responseCallback);
  }

  actualizar(id, dto) {
    var model = new FiscaliaModel();
    model.id = id;
    model.nombre = dto.nombre;
    model.direccion = dto.direccion;
    model.telefono = dto.telefono;
    model.update(this.responseCallback);
  }

  eliminar(id){
    var model = new FiscaliaModel();
    model.id = id;
    model.delete(this.responseCallback);
  }
}
