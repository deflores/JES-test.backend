import { connection } from "./database.js";
import tedious from "tedious";

export class BaseModel {
  table;
  result;
  tableFields = [];
  constructor(tableName, fields) {
    this.table = tableName;
    this.tableFields = fields;
  }
  connecToDb() {
    connection.initialiseConnection();
  }
  findAll(callbback) {
    // this.connecToDb();
    var self = this;
    self.result = [];
    var req = new tedious.Request(
      `select * from dbo.${this.table}`,
      (err, rowCount, rows) => {
        if (err) {
          console.log("error", err);
          callbback(null, err);
          return;
        }
        rows.forEach(function (row) {
          var tmp = {};
          row.forEach(function (col) {
            tmp[col.metadata.colName] = col.value;
          });
          self.result.push(tmp);
        });

        console.log("result", self.result);
        callbback(self.result, null);
      }
    );
    connection.execSql(req); // execSql(req);
  }
  findById(id, callbback) {
    //this.connecToDb();
    var TYPES = tedious.TYPES;
    var self = this;
    self.result = {};
    var req = new tedious.Request(
      `select * from dbo.${this.table} where id = @id`,
      (err, rowCount, rows) => {
        if (err) {
          console.log("error", err);

          callbback(null, err);
          return;
        }
        if (rowCount == 0) {
          console.log("error", err);
          connection.close();
          callbback(null, "There are no records");
          return;
        }

        var tmp = {};
        rows[0].forEach(function (col) {
          tmp[col.metadata.colName] = col.value;
        });
        self.result = tmp;

        console.log("result", self.result);

        callbback(self.result, null);
      }
    );
    req.addParameter("id", TYPES.VarChar, id);
    connection.execSql(req);
  }

  save(callbback) {
    var TYPES = tedious.TYPES;
    var self = this;
    self.result = 0;
    var req = new tedious.Request(`dbo.sp_insertar_${this.table}`, (err) => {
      if (err) {
        console.log("error", err);

        callbback(null, err);
        return;
      }
    });
    this.tableFields.forEach((fieldName) => {
      console.log(fieldName, "->", self[fieldName]);
      req.addParameter(fieldName, TYPES.NVarChar, self[fieldName]);
    });
    req.addOutputParameter("rowCount", TYPES.Int);
    req.on("returnValue", function (paramName, value, metadata) {
      callbback({ insertados: value }, null);
    });
    connection.callProcedure(req);
  }

  update(callbback) {
    //this.connecToDb();
    var TYPES = tedious.TYPES;
    var self = this;
    self.result = 0;
    var req = new tedious.Request(`dbo.sp_actualizar_${this.table}`, (err) => {
      if (err) {
        console.log("error", err);

        callbback(null, err);
        return;
      }
    });
    this.tableFields.forEach((fieldName) => {
      console.log(fieldName, "->", self[fieldName]);
      req.addParameter(fieldName, TYPES.NVarChar, self[fieldName]);
    });
    req.addOutputParameter("rowCount", TYPES.Int);
    req.on("returnValue", function (paramName, value, metadata) {
      callbback({ actualizados: value }, null);
    });
    connection.callProcedure(req);
  }
  delete(callbback) {
    var TYPES = tedious.TYPES;
    var self = this;
    self.result = 0;
    var req = new tedious.Request(`dbo.sp_eliminar_${this.table}`, (err) => {
      if (err) {
        console.log("error", err);

        callbback(null, err);
        return;
      }
    });
    req.addParameter("id", TYPES.NVarChar, self.id);

    req.addOutputParameter("rowCount", TYPES.Int);
    req.on("returnValue", function (paramName, value, metadata) {
      callbback({ actualizados: value }, null);
    });
    connection.callProcedure(req); // execSql(req);
  }
}
