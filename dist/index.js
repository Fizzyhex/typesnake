"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Brain_1 = require("./game/Brain");
const Game_1 = require("./game/Game");
const brain = new Brain_1.Brain();
const game = new Game_1.Game(brain);
game.start();
