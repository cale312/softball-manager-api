"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teams_1 = require("../models/teams");
/* GET Managers listing. */
class TeamsRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getAllTeams(req, res, next) {
        teams_1.default.find()
            .then((teams) => {
            let code = res.statusCode;
            let msg = res.statusMessage;
            res.json({
                teams: teams
            });
        })
            .catch((error) => {
            let code = res.statusCode;
            let msg = res.statusMessage;
            res.json({
                error
            });
        });
    }
    routes() {
        this.router.get('/', this.getAllTeams);
    }
}
exports.TeamsRouter = TeamsRouter;
const teamsRoute = new TeamsRouter();
// teamsRoute.routes();
exports.default = teamsRoute.router;
