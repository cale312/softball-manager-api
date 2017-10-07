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
            res.json({
                code,
                teams
            });
        })
            .catch((error) => {
            let code = res.statusCode;
            res.json({
                code,
                error
            });
        });
    }
    createTeam(req, res, next) {
        const teamName = req.body.teamName;
        const manager = req.body.manager;
        const coach = req.body.coach;
        const rank = req.body.rank;
        const teamPlayers = req.body.teamPlayers;
        if (!teamName || !coach || !rank || !manager) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        const team = new teams_1.default({
            teamName: teamName,
            manager: manager,
            coach: coach,
            rank: rank,
            teamPlayers
        });
        team.save()
            .then((team) => {
            let code = res.statusCode;
            res.json({
                code,
                team
            });
        })
            .catch((err) => {
            let code = res.statusCode;
            res.json({
                code,
                err
            });
        });
    }
    updateTeam(req, res, next) {
        const teamName = req.body.teamName;
        const coach = req.body.coach;
        if (!teamName) {
            res.status(422).json({ message: 'Fill in all required fields' });
        }
        teams_1.default.findOne({
            teamName: teamName
        }).then((result) => {
            result.update({
                coach: coach
            }).then((result) => {
                const code = res.statusCode;
                res.json({
                    code,
                    result
                });
            });
        }).catch((err) => {
            const code = res.statusCode;
            res.json({
                code,
                err
            });
        });
    }
    deleteTeam(req, res, next) {
        const _id = req.params._id;
        if (!_id) {
            res.status(422).json({ message: 'Fill in all required fields' });
        }
        teams_1.default.remove({
            _id: _id
        }).then((result) => {
            let code = res.statusCode;
            res.json({
                code,
                result
            });
        }).catch((err) => {
            let code = res.statusCode;
            res.json({
                code,
                err
            });
        });
    }
    routes() {
        this.router.get('/', this.getAllTeams);
        this.router.post('/newteam', this.createTeam);
        this.router.post('/deleteteam/:_id', this.deleteTeam);
        this.router.post('/updateteam', this.updateTeam);
    }
}
exports.TeamsRouter = TeamsRouter;
const teamsRoute = new TeamsRouter();
teamsRoute.routes();
exports.default = teamsRoute.router;
