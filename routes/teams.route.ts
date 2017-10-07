import { Router, Request, Response, NextFunction } from 'express';
import Teams from '../models/teams';

/* GET Managers listing. */
export class TeamsRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getAllTeams(req: Request, res: Response, next: NextFunction) {
    Teams.find()
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
    const manager: string = req.body.manager;
    const coach: string = req.body.coach;
    const rank: number = req.body.rank;
    const teamPlayers: any = req.body.teamPlayers;

    if (!teamName || !coach || !rank || !manager) {
      res.status(422).json({ message: 'All Fields Required.' });
    }

    const team = new Teams({
      teamName: teamName,
      manager: manager,
      coach: coach,
      rank: rank,
      teamPlayers
    });

    team.save()
      .then( (team: any) => {
        let code = res.statusCode;
        res.json({
            code,
            team
        });
      })
      .catch( (err: any) => {
        let code = res.statusCode;
        res.json({
          code,
          err
        });
      });

  }

  public updateTeam(req: Request, res: Response, next: NextFunction) {

    const coach: string = req.body.coach;
    const teamName: string = req.body.teamName;
    const teamPlayers: any = req.body.teamPlayers;

    if (!teamName) {
      res.status(422).json({ message: 'Fill in all required fields'});
    }

    Teams.findOne({
      teamName: teamName
    }).then( (result: any) => {
      result.update({
        coach: coach,
        teamPlayers: teamPlayers
      }).then( (result: any) => {
        let code = res.statusCode;
        res.json({
          code,
          result
        });
      });
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

    Teams.remove({
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
    this.router.post('/deleteteam/:_id', this.deleteTeam);
    this.router.post('/updateteam', this.updateTeam);
  }

}

const teamsRoute = new TeamsRouter();
teamsRoute.routes();

export default teamsRoute.router;
