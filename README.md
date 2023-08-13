# Snake

This is a classical game that is developed in Vue3.

### Rules

- The game is played in a 35x35 grid.
- The player starts as a single **cell** snake with a random direction.
- The player can navigate the snake via W, A, S, D keys or the arrow keys (⬆, ⬅, ⬇, ➡).
- If the snake hits the grid boundaries, it will continue to move in the same direction from the opposite end.
- The player needs to navigate the snake to the snack in order to have the snake grow and gain score.
- Each eaten snack contributes 1 point to the score.
- If the snake hits its own tail, then the game is over.

## Development

### Prerequisites

You need to install and setup the following:

- node.js
- yarn
- git

### Clone the repository

- Open up a terminal (Linux, macOS), or a command prompt (Windows)
- Navigate to the directory you would like to download this repository in
  - You can do this by running a `cd` command like so:
  ```bash
  cd /directory/for/this/repo
  ```
  - Do not forget to change `/directory/for/this/repo` with the directory of your own choosing!
- Clone the repository by running the following command:

```bash
git clone https://github.com/ekinkaradag/snake-vue3.git
```

### Running the game

- If the cloning process went well, you need to change the directory to the newly created `snake-vue3` folder in order to install the dependencies

  - To Change the directory, run the following command:

  ```bash
  cd snake-vue3
  ```

  - This can be done by running the following command:

  ```bash
  yarn
  ```

  - Or, if you prefer to use `npm`, you can run this:

  ```bash
  npm install
  ```

- Once the dependencies are installed, you can start the game in a live `dev` environment.

  - This can be done by running the following command:

  ```bash
  yarn dev
  ```

  - Or, if you prefer to use `npm`, you can run this:

  ```bash
  npm run dev
  ```

- If you would like to build it:

  - This can be done by running the following command:

  ```bash
  yarn build
  ```

  - Or, if you prefer to use `npm`, you can run this:

  ```bash
  npm run build
  ```

  - When you do this, the built files will be available in the `dist` folder.

- If you would like to deploy it to **GitHub Pages**:

  - This can be done by running the following command:

  ```bash
  yarn deploy
  ```

  - Or, if you prefer to use `npm`, you can run this:

  ```bash
  npm run deploy
  ```
