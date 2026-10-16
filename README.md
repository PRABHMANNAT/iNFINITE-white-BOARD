<div align="center">
  <img src="./public/favicon.svg" alt="Planora logo" width="88" height="88" />
  <h1>Planora</h1>
  <p><strong>Where plans take shape.</strong></p>
  <p>An infinite whiteboard for mapping ideas, sketching plans, and working together.</p>
</div>

Planora gives you a flexible canvas for project plans, diagrams, brainstorms, and quick sketches. Open the app, place your ideas, and keep moving. Your work is saved in the browser; you can also export a file to keep or share.

## What you can do

- Draw with shapes, arrows, freehand strokes, text, and images.
- Arrange ideas across an infinite canvas with zoom, pan, and undo/redo.
- Save and reopen editable `.excalidraw` files, or export images.
- Use shape libraries and switch between light and dark themes.
- Collaborate live when the supporting room service is configured.

## Run locally

You need Node.js 18 or newer and Corepack. From the repository root:

```bash
corepack yarn install --frozen-lockfile
corepack yarn --cwd excalidraw-app vite --host 127.0.0.1 --port 5188
```

Open [http://127.0.0.1:5188/](http://127.0.0.1:5188/). The root URL opens the whiteboard directly. The core editor runs locally; live collaboration and AI features require their separate services and configuration in `.env.development`.

To check the code or build the app:

```bash
corepack yarn test:typecheck
corepack yarn build
```

## Project and credits

Planora is developed with love and code by [Prabhmannat](https://github.com/PRABHMANNAT). The [GitHub repository](https://github.com/PRABHMANNAT/iNFINITE-white-BOARD) contains the app and welcomes stars and contributions.

The editor is based on the open-source [Excalidraw](https://github.com/excalidraw/excalidraw) code at [upstream commit `4c37956`](https://github.com/excalidraw/excalidraw/commit/4c37956ba5f04ec342a9d9d5891a38f22c5b7b4e). Its package names, `.excalidraw` file format, and relevant internal identifiers are retained for compatibility. The upstream copyright notice and [MIT license](./LICENSE) remain in this repository.
