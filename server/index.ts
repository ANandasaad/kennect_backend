import bodyParser from "body-parser";
import express from "express";
import { ListenPlugin, RouterPlugin } from "./plugins";

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", (req, res) => {
  res.json({ success: true, message: "Success" });
});
RouterPlugin.routeSetup(app);
ListenPlugin.listen(app);
