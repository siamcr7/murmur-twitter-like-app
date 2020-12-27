import { ControllerBase } from "./controller-base";
import * as core from "express-serve-static-core";
import { Connection } from "mysql";
import { Post } from "../models/post";
import { UserPostLike } from "../models/user-post-like";

export class PostController extends ControllerBase {
  constructor(protected connection: Connection) {
    super(connection);
  }

  addPost(req: core.Request, res: core.Response) {
    const post: Post = {
      Content: req.body.content,
      UserId: req.body.userId,
    };

    this.connection.query({
        sql: "INSERT INTO POSTS SET ?",
        values: [post],
      },
      (err, rows) => this.sendResponse(err, {}, res)
    );
  }

  getPostsByUserId(userId: number, onlySelf: boolean, res: core.Response) {
    let query = `
      SELECT Id, Content, UserId, LikeCount
      FROM Posts p
      left outer join
      (
        select PostId, Count(UserId) as LikeCount from userpostlike u
        group by PostId
      ) upl on
      p.Id = upl.PostId
    `;

    if (onlySelf === true) {
      query += `
        WHERE p.UserId = ${userId}
      `;
    } else {
      query += `
        WHERE p.UserId IN (
          SELECT DISTINCT followingUserId FROM Followers WHERE userId = ${userId}
        ) OR p.UserId = ${userId}
      `;
    }

    this.connection.query({
      sql: query,
      values: [userId],
    }, (err, rows) => this.sendResponse(err, rows, res)
    );
  }

  getLikedPostsByUserId(userId: number, res: core.Response) {
    this.connection.query({
      sql: `
        SELECT DISTINCT postId FROM userPostLike
        WHERE userId = ?
      `,
      values: [userId],
    }, (err, rows) => this.sendResponse(err, (rows as any[]).map(row => row.postId), res)
    );
  }

  deletePost(postId: number, res: core.Response) {
    this.connection.query({
        sql: "DELETE FROM Posts WHERE Id = ?",
        values: [postId],
      },
      (err, rows) => this.sendResponse(err, {}, res)
    );
  }

  addLike(req: core.Request, res: core.Response) {
    const userPostLike: UserPostLike = {
      PostId: req.body.postId,
      UserId: req.body.userId,
    };

    this.connection.query({
        sql: "INSERT INTO UserPostLike SET ?",
        values: [userPostLike],
      },
      (err, rows) => this.sendResponse(err, {}, res)
    );
  }

  deleteLike(userId: number, postId: number, res: core.Response) {
    this.connection.query({
        sql: "DELETE FROM UserPostLike WHERE UserId = ? AND postId = ?",
        values: [userId, postId],
      },
      (err, rows) => this.sendResponse(err, {}, res)
    );
  }
}
