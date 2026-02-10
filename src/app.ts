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

// config static files
app.use(express.static('public'));

// config routes
webRoutes(app);

// seed data
initData();

// handle 404 not found
app.use((req, res) => {
  res.send('404 not found');
})

// domain expansion
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
