import { ControllerBase } from "./controller-base";
import * as core from "express-serve-static-core";
import { Connection } from "mysql";

export class PostController extends ControllerBase {
  constructor(protected connection: Connection) {
    super(connection);
  }

  addPost(req: core.Request, res: core.Response) {
    // console.log('See Body: ', req.body);
    this.connection.query("INSERT INTO POSTS SET ?", req.body, (err, rows) => {
      if (err) {
        res.status(500).json();
      } else {
        res.status(200).json({});
      }
    });
  }
}