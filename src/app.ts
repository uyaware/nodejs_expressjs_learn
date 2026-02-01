import express from "express";
import 'dotenv/config';
import webRoutes from "@/routes/web";
import { initData } from "./config/seed";

const app = express();
const port = process.env.PORT;

// config template engine 
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config routes
webRoutes(app);

// seed data
initData();

// config static files
app.use(express.static('public'));

// domain expansion
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
