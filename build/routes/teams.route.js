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
                code,
                msg,
                teams
            });
        })
            .catch((error) => {
            let code = res.statusCode;
            let msg = res.statusMessage;
            res.json({
                code,
                msg,
                error
            });
        });
    }
    createTeam(req, res, next) {
        const teamName = req.body.teamName;
        const coach = req.body.coach;
        const rank = req.body.rank;
        const teamPlayers = req.body.teamPlayers;
        if (!teamName || !coach || !rank) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        const team = new teams_1.default({
            teamName: teamName,
            coach: coach,
            rank: rank,
            teamPlayers
        });
        team.save()
            .then((team) => {
            let code = res.statusCode;
            let msg = res.statusMessage;
            res.json({
                code,
                msg,
                team
            });
        })
            .catch((err) => {
            let code = res.statusCode;
            let msg = res.statusMessage;
            res.json({
                code,
                msg,
                err
            });
        });
    }
    routes() {
        this.router.get('/', this.getAllTeams);
        this.router.post('/newteam', this.createTeam);
    }
}
exports.TeamsRouter = TeamsRouter;
const teamsRoute = new TeamsRouter();
teamsRoute.routes();
exports.default = teamsRoute.router;
