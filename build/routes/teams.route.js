"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teams_1 = require("../models/teams");
const managers_1 = require("../models/managers");
const players_1 = require("../models/players");
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
        const managerName = req.body.managerName;
        const coach = req.body.coach;
        const rank = req.body.rank;
        if (!teamName || !coach || !rank || !managerName) {
            res.status(422).json({ message: 'All Fields Required Must Be Filled.' });
        }
        let manager = new managers_1.default({
            fullName: managerName,
            ownedTeam: teamName
        });
        let team = new teams_1.default({
            teamName: teamName,
            managerName: managerName,
            coach: coach,
            rank: rank,
            teamPlayers: []
        });
        teams_1.default.findOne({
            teamName: teamName
        }).then((result) => {
            if (!result) {
                manager.save();
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
            else {
                let code = res.statusCode;
                let msg = 'Team Name already exist';
                res.json({
                    code,
                    msg,
                    result
                });
            }
        });
    }
    updateTeam(req, res, next) {
        const coach = req.body.coach;
        const teamName = req.body.teamName;
        const playerName = req.body.playerName;
        const age = req.body.age;
        const position = req.body.position;
        if (!teamName || !playerName || !age || !position) {
            res.status(422).json({ message: 'Fill in all required fields' });
        }
        teams_1.default.findOne({
            teamName: teamName
        }).then((result) => {
            let player = new players_1.default({
                fullName: playerName,
                age: age,
                position: position,
                team: teamName
            });
            player.save();
            result.teamPlayers.push(player);
            result.save()
                .then((result) => {
                let code = res.statusCode;
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
        const teamName = req.body.teamName;
        if (!teamName) {
            res.status(422).json({ message: 'Fill in all required fields' });
        }
        teams_1.default.remove({
            teamName: teamName
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
        this.router.post('/deleteteam', this.deleteTeam);
        this.router.post('/updateteam', this.updateTeam);
    }
}
exports.TeamsRouter = TeamsRouter;
const teamsRoute = new TeamsRouter();
teamsRoute.routes();
exports.default = teamsRoute.router;
