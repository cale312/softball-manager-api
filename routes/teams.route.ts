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
        let msg = res.statusMessage;
        res.json({
          code,
          msg,
          teams
        });
      })
      .catch((error: any) => {
        let code = res.statusCode;
        let msg = res.statusMessage;
        res.json({
          code,
          msg,
          error
        });
      })
  }

  public createTeam(req: Request, res: Response, next: NextFunction) {

    const teamName: string = req.body.teamName;
    const coach: string = req.body.coach;
    const rank: number = req.body.rank;
    const teamPlayers: any = req.body.teamPlayers;

    if (!teamName || !coach || !rank) {
      res.status(422).json({ message: 'All Fields Required.' });
    }

    const team = new Teams({
      teamName: teamName,
      coach: coach,
      rank: rank,
      teamPlayers
    });

    team.save()
      .then( (team: any) => {
        let code = res.statusCode;
        let msg = res.statusMessage;
        res.json({
            code,
            msg,
            team
        });
      })
      .catch( (err: any) => {
        let code = res.statusCode;
        let msg = res.statusMessage;
        res.json({
          code,
          msg,
          err
        });
      })

  }

  routes() {
    this.router.get('/', this.getAllTeams);
    this.router.post('/newteam', this.createTeam);
  }

}

const teamsRoute = new TeamsRouter();
teamsRoute.routes();

export default teamsRoute.router;