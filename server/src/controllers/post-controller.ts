import { ControllerBase } from "./controller-base";
import * as core from "express-serve-static-core";
import { Connection } from "mysql";
import { Post } from "../models/post";

export class PostController extends ControllerBase {
  constructor(protected connection: Connection) {
    super(connection);
  }

  addPost(req: core.Request, res: core.Response) {
    const post: Post = {
      Content: req.body.content,
      UserId: req.body.userId
    };

    this.connection.query({
      sql: "INSERT INTO POSTS SET ?",
      values: [post]
    }, (err, rows) => this.sendResponse(err, {}, res));
  }
}