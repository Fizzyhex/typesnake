# Snake Game in TypeScript

A classic Snake game implemented in TypeScript with browser rendering.

## Project Structure

```
src/
├── models/
│   ├── Snake.ts         # Snake class
│   ├── Position.ts      # Position interface
│   └── Direction.ts     # Direction enum
├── game/
│   ├── Game.ts          # Main game logic
│   ├── Board.ts         # Game board class
│   ├── Renderer.ts      # Canvas rendering
│   └── Config.ts        # Game settings
├── utils/
│   └── Random.ts        # Random number utilities
├── index.html           # Main HTML file
└── index.ts            # Entry point
```

## Features

- Snake movement using arrow keys
- Random food generation
- Snake growth when eating food
- Game field borders wrapping
- Score tracking
- Pause functionality (Space bar)

## Prerequisites

- Bun (v1.4 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Fizzyhex/typesnake.git
cd typesnake
```

2. Install dependencies:
```bash
bun install
```

## Running the Game

1. Start the development server:
```bash
bun start
```

2. Open your browser and navigate to `http://localhost:9000`

## Building for Production

To create a production build:
```bash
bun run build
```

The built files will be in the `dist` directory.

## Controls

- Arrow Up: Move Up
- Arrow Down: Move Down
- Arrow Left: Move Left
- Arrow Right: Move Right
- Space: Pause/Resume Game

## Technologies Used

- TypeScript
- Webpack
- HTML5 Canvas
- Bun

## Project Setup Details

The project uses the following main dependencies:
- TypeScript for type-safe code
- Webpack for bundling
- ts-loader for TypeScript compilation
- html-webpack-plugin for HTML file handling

## Development

To start development:
1. Make sure all dependencies are installed with `bun install`
2. Run `bun start` to start the development server
3. Make changes to the code - the game will automatically reload

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Author

Anton Aparin

## Repository

[https://github.com/Fizzyhex/typesnake.git](https://github.com/Fizzyhex/typesnake.git)