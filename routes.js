import { MPFiscaliasController } from "./fiscaliasController.js";
import express from "express";
var routes = express.Router();
routes.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
routes
  .route("/api/fiscalias")
  .get(function (req, res, next) {
    var fiscalias = new MPFiscaliasController(req, res);
    fiscalias.get();
  })
  .post(function (req, res, next) {
    var fiscalias = new MPFiscaliasController(req, res);
    fiscalias.crear(req.body);
  });
routes
  .route("/api/fiscalias/:id")
  .get(function (req, res, next) {
    var fiscalias = new MPFiscaliasController(req, res);
    fiscalias.getById(req.params.id);
  })
  .patch(function (req, res, next) {
    var fiscalias = new MPFiscaliasController(req, res);

    fiscalias.actualizar(req.params.id, req.body);
  })
  .delete(function (req, res, next) {
    var fiscalias = new MPFiscaliasController(req, res);

    fiscalias.eliminar(req.params.id);
  });

export { routes };
