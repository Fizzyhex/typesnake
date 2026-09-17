"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
const Direction_1 = require("./Direction");
class Snake {
    constructor(startX, startY) {
        this.growing = false;
        this.body = [{ x: startX, y: startY }];
        this.direction = Direction_1.Direction.RIGHT;
    }
    getBody() {
        return [...this.body];
    }
    getHead() {
        return Object.assign({}, this.body[0]);
    }
    setDirection(direction) {
        this.direction = direction;
    }
    getDirection() {
        return this.direction;
    }
    grow() {
        this.growing = true;
    }
    move() {
        const head = this.body[0];
        let newHead;
        switch (this.direction) {
            case Direction_1.Direction.UP:
                newHead = {
                    x: head.x,
                    y: head.y - 1
                };
                break;
            case Direction_1.Direction.RIGHT:
                newHead = {
                    x: head.x + 1,
                    y: head.y
                };
                break;
            case Direction_1.Direction.DOWN:
                newHead = {
                    x: head.x,
                    y: head.y + 1
                };
                break;
            case Direction_1.Direction.LEFT:
                newHead = {
                    x: head.x - 1,
                    y: head.y
                };
                break;
        }
        this.body.unshift(newHead);
        if (!this.growing) {
            this.body.pop();
        }
        else {
            this.growing = false;
        }
    }
}
exports.Snake = Snake;
