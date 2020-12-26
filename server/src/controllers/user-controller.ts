import { Connection } from "mysql";
import { ControllerBase } from "./controller-base";
import * as core from "express-serve-static-core";

export class UserController extends ControllerBase {
  constructor(protected connection: Connection) {
    super(connection);
  }

  getUsers(res: core.Response) {
    this.connection.query("SELECT * FROM Users", (err, rows) => {
      if (err) {
        res.status(500).json();
      } else {
        res.status(200).json(rows);
      }
    });
  }

  addUser(res: core.Response) {
    this.connection.query("SELECT * FROM Users", (err, rows) => {
      if (err) {
        res.status(500).json();
      } else {
        res.status(200).json(rows);
      }
    });
  }
}
