import { Brain } from './game/Brain';
import { Game } from './game/Game';

const brain = new Brain();

const game = new Game(brain);
game.start();