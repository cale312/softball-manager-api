import { Router, Request, Response, NextFunction } from 'express';
import Team from '../models/teams';
import Manager from '../models/managers';
import Player from '../models/players';

/* GET Managers listing. */
export class TeamsRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getAllTeams(req: Request, res: Response, next: NextFunction) {
    Team.find()
      .then((teams: any) => {
        let code = res.statusCode;
        res.json({
          code,
          teams
        });
      })
      .catch((error: any) => {
        let code = res.statusCode;
        res.json({
          code,
          error
        });
      })
  }

  public createTeam(req: Request, res: Response, next: NextFunction) {

    const teamName: string = req.body.teamName;
    const managerName: string = req.body.managerName;
    const coach: string = req.body.coach;
    const rank: number = req.body.rank;

    if (!teamName || !coach || !rank || !managerName) {
      res.status(422).json({ message: 'All Fields Required Must Be Filled.' });
    }

    let manager = new Manager({
      fullName: managerName,
      ownedTeam: teamName
    });

    let team = new Team({
      teamName: teamName,
      managerName: managerName,
      coach: coach,
      rank: rank,
      teamPlayers: []
    });

    Team.findOne({
      teamName: teamName
    }).then( (result: any) => {
      if (!result) {
        manager.save();
        team.save()
          .then((team: any) => {
            let code = res.statusCode;
            res.json({
              code,
              team
            });
          })
          .catch((err: any) => {
            let code = res.statusCode;
            res.json({
              code,
              err
            });
          });
      } else {
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

  public updateTeam(req: Request, res: Response, next: NextFunction) {

    const coach: string = req.body.coach;
    const teamName: string = req.body.teamName;

    const playerName: string = req.body.playerName;
    const age: number = req.body.age;
    const position: string = req.body.position;

    if (!teamName || !playerName || !age || !position) {
      res.status(422).json({ message: 'Fill in all required fields'});
    }
    
    Team.findOne({
      teamName: teamName
    }).then( (result: any) => {
      let player = new Player({
        fullName: playerName,
        age: age,
        position: position,
        team: teamName
      });
      player.save();
      result.teamPlayers.push(player);
      result.save()
        .then( (result: any) => {
          let code = res.statusCode;
          res.json({
            code,
            result
          });
        })
    }).catch( (err: any) => {
      const code = res.statusCode;
      res.json({
        code,
        err
      });
    });

  }

  public deleteTeam(req: Request, res: Response, next: NextFunction) {

    const teamName: string = req.body.teamName;

    if (!teamName) {
      res.status(422).json({ message: 'Fill in all required fields' })
    }

    Team.remove({
      teamName: teamName
    }).then( (result: any) => {
      let code = res.statusCode;
      res.json({
        code,
        result
      });
    }).catch( (err: any) => {
      let code = res.statusCode;
      res.json({
        code,
        err
      })
    });

  }

  routes() {
    this.router.get('/', this.getAllTeams);
    this.router.post('/newteam', this.createTeam);
    this.router.post('/deleteteam', this.deleteTeam);
    this.router.post('/updateteam', this.updateTeam);
  }

}

const teamsRoute = new TeamsRouter();
teamsRoute.routes();

export default teamsRoute.router;
