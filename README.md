
**r6db has been discontinued due to the inceasing amount of time and effort needed to continue.**


# R6DB  
React&Redux based SPA.
Routing is handled by `redux-first-router`.  

If you want to suggest a feature or submit a bug, please head over to the [main repository](https://github.com/r6db/r6db/issues) and submit an issue there.

## Deployment

- master is autodeployed to https://dev.r6db.com
- deploy is autodeployed to https://r6db.com


## Structure

```
|
| - build    -> target directory when running a full build
| - webpack  -> webpack configs
| - src      -> contains app src
|   |
|   | - app             -> app code
|   |   | - components
|   |   |   | - misc    -> folder for resusable and one-off components
|   |   |   | - Pages   -> top-level Pages
|   |   |   | - ...
|   |   | - lib         -> non-component code
|   |   |   | - api     -> calls to r6db api
|   |   |   | - store   -> redux stuff, routes
|   |   |   | ...
|   |   | - app.ts      -> app mount
|   |   | - index.ts    -> root imports
|   |   | - sw.js       -> serviceworker code
|   | - assets          -> contains images/fonts, etc
|   | - favicons        -> generated favicons
|   | - scss            -> holds variables and mixins
|   | - index.ejs       -> template for the index.html file


```

## local installation

you need to have [node](https://nodejs.org/en/) and [yarn](https://nodejs.org/en/) (or npm) installed locally.
after installing the dependencies with `yarn install`, you have following commands available

 - `yarn start` to run the dev-server
 - `yarn build` to build the app in production mode
 - `yarn build:dev` to build the app in development mode
