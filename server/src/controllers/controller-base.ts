import { Connection } from "mysql";

export class ControllerBase {
  constructor(protected connection: Connection) {
  }
}