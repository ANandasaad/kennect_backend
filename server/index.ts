import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { ListenPlugin, RouterPlugin } from "./plugins";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

RouterPlugin.routeSetup(app);
ListenPlugin.listen(app);
