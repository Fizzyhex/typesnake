import { Snake } from "../models/Snake";
import { Board } from "./Board";
import { Direction } from "../models/Direction";
import { pos_fromHash, pos_add, pos_hash, Position, pos_subtract } from "../models/Position";
import { CONFIG } from "./Config";
import { isThinkResponse } from "../api/think";

const specialTileNames = {
    [CONFIG.CELL_EMPTY]: "empty",
    [CONFIG.CELL_FOOD]: "food",
    [CONFIG.CELL_HEAD]: "head",
    [CONFIG.CELL_SNAKE]: "snake",
} as const;

export class Brain {
    private updateTimer = 0;
    private inputQueue: Array<Direction> = [];
    private direction: Direction = Direction.DOWN;

    constructor() {
        this.updateTimer = 0;
    }

    public onEat() {
        this.updateTimer = 0;
    }

    private async think(snake: Snake, board: Board) {
        let context = [];

        const direction = this.directionToPosition(snake.getDirection());
        const headPosition = snake.getHead();

        context.push(`x:${headPosition.x} y:${headPosition.y}`);
        context.push(`direction_x: ${direction.x} direction_y: ${direction.y}`);
        context.push(`play area size: ${CONFIG.BOARD_WIDTH}, ${CONFIG.BOARD_HEIGHT}`);

        for (let tileOffset = 0; tileOffset < 6; tileOffset++) {
            const pos = pos_add(snake.getHead(), {
                x: direction.x * (tileOffset + 1),
                y: direction.y * (tileOffset + 1),
            });
            const posHash = pos_hash(pos);

            if (posHash in board.specialTileMap) {
                const tileName = specialTileNames[board.specialTileMap[posHash]];
                context.push(`${tileName} is just ${tileOffset} tiles in-front`);
            }
        }

        for (let tileHash in board.specialTileMap) {
            let tile = board.specialTileMap[tileHash];
            const tileName = specialTileNames[tile];
            let tilePos = pos_fromHash(tileHash);

            let relative = pos_subtract(tilePos, headPosition);

            context.push(`${tileName} is ${pos_hash(relative)} tiles away`)
        }

        for (let tileOffset = 0; tileOffset < 6; tileOffset++) {
            const pos = pos_add(snake.getHead(), {
                x: direction.x * (tileOffset + 1),
                y: direction.y * (tileOffset + 1),
            });

            if (pos.x >= 0 && pos.x < CONFIG.BOARD_WIDTH &&
                pos.y >= 0 && pos.y < CONFIG.BOARD_HEIGHT &&
                board.getCell(pos) === CONFIG.CELL_FOOD) {
                context.push(`food is ${tileOffset} tiles in-front`);
            }
        }

        let prompt = context.join("\n");

        try {
            const response = await fetch("/api/think", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error(`Think request failed with status ${response.status}`);
            }

            const result: unknown = await response.json();
            if (!isThinkResponse(result)) {
                throw new Error("Think response did not match the expected schema");
            }

            const inputMap = {
                up: Direction.UP,
                down: Direction.DOWN,
                left: Direction.LEFT,
                right: Direction.RIGHT,
            } as const;
            const waitTranslation = {
                "1": 1,
                "2-3": 3,
                "4-9": 9,
                "10+": 10,
            } as const;
            const wait = waitTranslation[result.answers.for.choice];

            for (let i = 0; i < wait + 1; i++) {
                this.inputQueue.push(inputMap[result.answers.input.choice]);
            }

            this.inputQueue.push(inputMap[result.answers.swerve.choice]);
            this.updateTimer = wait;
        } catch (error) {
            console.error("Unable to get the next move", error);
        }
    }

    public tick(snake: Snake, board: Board): Direction {
        this.updateTimer -= 1;

        if (this.updateTimer <= 0) {
            this.updateTimer = 50;
            this.think(snake, board);
        }

        let next = this.inputQueue.pop()

        if (next) {
            this.direction = next;
            return next;
        } else {
            return this.direction;
        }
    }

    private directionToPosition(direction: Direction): Position {
        switch (direction) {
            case Direction.UP:
                return { x: 0, y: -1 };
            case Direction.RIGHT:
                return { x: 1, y: 0 };
            case Direction.DOWN:
                return { x: 0, y: 1 };
            case Direction.LEFT:
                return { x: -1, y: 0 };
        }
    }
}