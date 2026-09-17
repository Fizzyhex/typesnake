# Snake Game in TypeScript

This is a fork of Anton Aparin's snake game with TypeSafe system one integration.

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

1. Set `TYPESAFE_API_KEY` in the environment used by the server. Bun automatically loads a local `.env` file.
2. Start the server:
```bash
bun run start
```

1. Open your browser and navigate to `http://localhost:3000`.

The game sends `POST /api/think` requests with this JSON body:
```json
{ "prompt": "..." }
```

The API forwards the prompt to TypeSafe System One and returns the model, usage, and typed `input`, `for`, and `swerve` answers.

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
- Bun
- HTML5 Canvas

## Project Setup Details

The project uses the following main dependencies:
- TypeScript for type-safe code
- Bun for bundling and serving the game and API

## Development

To start development:
1. Make sure all dependencies are installed with `bun install`
2. Run `bun start` to start the server
3. Make changes to the code - the game will automatically reload

The API key that was previously present in the local `.env` must be rotated if it was ever shared or committed. Do not add API keys to source files or documentation.

## License

This project is licensed under the MIT License - see the LICENSE file for details