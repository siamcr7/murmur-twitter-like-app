import * as core from "express-serve-static-core";
import { Connection } from "mysql";
import { FollowerController } from "./controllers/follower-controller";
import { PostController } from "./controllers/post-controller";
import { UserController } from "./controllers/user-controller";

export class Router {
  constructor(private router: core.Router, private connection: Connection) {
    this.userRoutes();
    this.postRoutes();
    this.followerRoutes();
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

  private followerRoutes() {
    const followerController = new FollowerController(this.connection);
    this.router.get('/followers/:userId', (req, res) => {
      followerController.getFollowersByUserId(+(req.params.userId), res);
    });

    this.router.post('/followers', (req, res) => {
      followerController.addFollower(req, res);
    });

    this.router.delete('/followers/:userId/:followingUserId', (req, res) => {
      followerController.deleteFollower(+(req.params.userId), +(req.params.followingUserId), res);
    });
  }
}
