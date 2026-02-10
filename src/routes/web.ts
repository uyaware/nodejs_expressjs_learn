import express from "express";
import { Express } from "express";
import {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
} from "@/controllers/user-controller";
import {
  getAdminOrderPage,
  getAdminUserPage,
  getDashboardPage,
} from "@/controllers/admin/dashboard-controller";
import fileUploadMiddleware from "@/middleware/multer-file-upload";
import {
  getAdminProductPage,
  getAdminCreateProductPage,
  postCreateProduct,
  getViewProduct,
  postUpdateProduct,
  postDeleteProduct,
} from "@/controllers/admin/product-controller";
import { getProductDetailClient } from "@/controllers/client/product-client-controller";
import { getLoginPage, getRegisterPage, postRegister } from "@/controllers/client/auth-controller";

const router = express.Router();

export default function webRoutes(app: Express) {
  //-------------- admin routes
  router.get("/admin", getDashboardPage);

  // admin user
  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/create-user", getCreateUserPage);
  router.post(
    "/admin/create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser,
  );
  router.post("/admin/delete-user/:id", postDeleteUser);
  router.get("/admin/view-user/:id", getViewUser);
  router.post(
    "/admin/update-user",
    fileUploadMiddleware("avatar"),
    postUpdateUser,
  );

  // admin product
  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/create-product", getAdminCreateProductPage);
  router.post(
    "/admin/create-product",
    fileUploadMiddleware("image", "images/products"),
    postCreateProduct,
  );
  router.get("/admin/view-product/:id", getViewProduct);
  router.post(
    "/admin/update-product",
    fileUploadMiddleware("image", "images/products"),
    postUpdateProduct,
  );
  router.post("/admin/delete-product/:id", postDeleteProduct) 

  // admin order
  router.get("/admin/order", getAdminOrderPage);

  //-------------- client
  router.get("/", getHomePage);
  router.get("/login", getLoginPage);
  router.get("/register", getRegisterPage);

  // client product
  router.get("/product/:id", getProductDetailClient);

  //--------------- auth 
  router.post("/register", postRegister)

  // base url (ex: base: '/abc' 'localhost:3000/hello' => 'localhost:3000/abc/hello');
  app.use("/", router);
}
