# SVG Path Builder

Build an SVG path quickly using a GUI. The demo is available at http://anthonydugois.com/svg-path-builder.

## Start the dev server

Basically, the dev server starts at http://localhost:1337. You can change that by editing the `variables.js` file.

Install all dependencies:

```
$ npm install
```

Then start the server:

```
$ npm start
```

## Build all files

If you store the code in a different folder than `svg-path-builder/`, you have to change the basename in `src/routes/index.js` to make sure the router is working.

```
$ npm run prod
```
