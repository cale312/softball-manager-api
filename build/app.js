"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// custom modules
const teams_route_1 = require("./routes/teams.route");
const managers_route_1 = require("./routes/managers.route");
// Server class
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    // application config
    config() {
        const MONGO_URI = 'mongodb://localhost/softball-manager' || process.env.MONGODB_URI;
        mongoose.connect(MONGO_URI, {
            useMongoClient: true
        }, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Database Connected!');
        });
        // express middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(cors());
        // cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
    // application routes
    routes() {
        let router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/teams', teams_route_1.TeamsRouter);
        this.app.use('/api/v1/managers', managers_route_1.ManagersRoute);
    }
}
// export
exports.default = new Server().app;
