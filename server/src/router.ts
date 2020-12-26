import * as core from "express-serve-static-core";
import { Connection } from "mysql";
import { PostController } from "./controllers/post-controller";
import { UserController } from "./controllers/user-controller";

export class Router {
  constructor(private router: core.Router, private connection: Connection) {
    this.userRoutes();
    this.postRoutes();
  }

  private userRoutes() {
    const userController = new UserController(this.connection);
    this.router.get("/users", (req, res) => {
      userController.getUsers(res);
    });
  }

  private postRoutes() {
    const postController = new PostController(this.connection);
    this.router.post('/posts', (req, res) => {
      postController.addPost(req, res);
    });
  }
}
