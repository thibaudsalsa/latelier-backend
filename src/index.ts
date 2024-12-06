import express, { Request, Response } from 'express';
import { PORT, RequestStatusCode } from './model';
import { PlayersService } from './services/players.service';

export const app = express();
const playersService = new PlayersService();

app.get('/players', (req: Request, res: Response) => {
  try {
    const players = playersService.getListOfPlayers();
    res.status(RequestStatusCode.OK).send(players);
  } catch (err) {
    res.status(RequestStatusCode.INTERNAL_SERVER_ERROR);
  }
});


app.get('/player/:id', (req: Request, res: Response) => {
  try {
    const playerId = parseInt(req.params.id, 10);
    const player = playersService.getPlayerById(playerId);
    if (!player) {
      res.status(RequestStatusCode.NOT_FOUND);
    } else {
      res.status(RequestStatusCode.OK).send(player);
    }
  } catch (err) {
    res.status(RequestStatusCode.INTERNAL_SERVER_ERROR);
  }
});


app.get('/players-analystics', (req: Request, res: Response) => {
  try {
    const analystics = playersService.getPlayersAnalytics();
    res.status(RequestStatusCode.OK).json(analystics);
  } catch (err) {
    res.status(RequestStatusCode.INTERNAL_SERVER_ERROR);
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});