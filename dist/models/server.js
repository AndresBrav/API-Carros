"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_1 = __importDefault(require("../routes/producto"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
        this.app.get("/", (req, res) => {
            res.json({ message: "Api working" });
        });
        this.app.use("/api/productos", producto_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    dbConnet() {
        return __awaiter(this, void 0, void 0, function* () {
            //conexion a la base de datos
            try {
                yield connection_1.default.authenticate();
                console.log("base de datos conectada");
            }
            catch (error) {
                console.log(error);
                console.log('error al conectarse en la base de datos');
            }
        });
    }
}
exports.default = Server;
