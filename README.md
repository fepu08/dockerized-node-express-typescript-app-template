# dockerized-node-express-typescript-app-template

A dockerized node app using express and typescript

# File Structure

```
.
├── index.js    # App entry point
├── api         # Express route controllers for all the endpoints of the map
├── config      # Environment variables and configuration related stuff
├── loaders     # Split the startup process into modules
├── modules     # Database models
├── services    # All the business logic is here
├── subscribers # Event handlers for async task
└── types       # Type declaration files (d.ts) for typescript
```

# Docker

- Bind-mount package.json. This allows adding packages in realtime without rebuilding images. e.g.
  - `docker-compose exec backend npm install --save <package name>` (doesn't work on all systems)
  - `docker-compose exec backend bash` & `npm install --save <package name>`

After installing the package, you may change some files to invoke a nodemon restart.

Moreover after `docker-compose down` you should use `npm i` or start with `docker-compose up --build` next time.
