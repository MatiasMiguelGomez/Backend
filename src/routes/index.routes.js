import express from "express";
import products from "./products.routes.js"
import carts from "./carts.routes.js"

const routes = express();

routes.use("/products", products);
routes.use("/carts", carts);

export default routes;