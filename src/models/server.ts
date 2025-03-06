import express, { Application, Request, Response } from "express";
import routesProducto from "../routes/producto";
import db from "../db/connection";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.listen();
        this.middlewares();
        this.routes(); // para que funcione las rutas
        this.dbConnet(); //conexion a la base de datos
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }

    routes() {
        this.app.get("/", (req: Request, res: Response) => {
            res.json({ message: "Api working" });
        });

        this.app.use("/api/productos", routesProducto);
    }

    middlewares() {
        this.app.use(express.json());
    }

    async dbConnet() {
        //conexion a la base de datos

        try {
            await db.authenticate();
            console.log("base de datos conectada");
        } catch (error) {
            console.log(error);
            console.log('error al conectarse en la base de datos');
        }
    }
}

export default Server;
