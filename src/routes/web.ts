import express from "express";
import { Express } from "express";
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "@/controllers/user-controller";


const router = express.Router();

export default function webRoutes(app: Express) {
  router.get("/", getHomePage);
  
  router.get("/create-user", getCreateUserPage);
  router.post("/handle-create-user", postCreateUser);
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUser);
  router.post("/handle-update-user", postUpdateUser);

  // base url (ex: base: '/abc' 'localhost:3000/hello' => 'localhost:3000/abc/hello');
  app.use('/', router);
}
