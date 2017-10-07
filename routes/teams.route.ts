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

  routes() {
    this.router.get('/', this.getAllTeams);
  }

}

const teamsRoute = new TeamsRouter();
teamsRoute.routes();

export default teamsRoute.router;