FROM node:18 as base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE $PORT
RUN apt-get update && apt-get install curl -y
RUN npm i npm@latest -g
RUN mkdir -p /opt/node_app/app && chown -R node:node /opt/node_app
WORKDIR /opt/node_app/app
USER node
COPY --chown=node:node package.json package-lock.json* ./

FROM base as dev
ENV NODE_ENV=development
ENV PATH=/opt/node_app/node_modules/.bin:$PATH
# when using an unprivileged user, avoid permission errors when installing packages in the container
# via docker exec by leaving a user owned, empty node_modules
RUN npm install --ignore-scipts && mv node_modules ../ && mkdir node_modules
COPY --chown=node:node . .
CMD ["nodemon", "--exec", "../node_modules/.bin/ts-node", "./src/index.ts"]

FROM base as source
RUN npm install --no-optional && npm cache clean --force && mv node_modules ../ && mkdir node_modules
COPY --chown=node:node . .

# use this in automated CI
FROM source as test
ENV NODE_ENV=development
ENV PATH=/opt/node_app/node_modules/.bin:$PATH
# this copies all dependencies (prod+dev)
COPY --chown=node:node --from=dev /opt/node_app/node_modules /opt/node_app/node_modules
# run linters as part of build
# be sure they are installed with devDependencies
RUN eslint . 
# run unit tests as part of build
RUN npm test
# run integration testing with docker-compose later
CMD ["npm", "run", "test"] 

## Stage 5 (default, production)
# this will run by default if you don't include a target
# it has prod-only dependencies
# In BuildKit, this is skipped for dev and test stages
FROM source as prod
CMD ["node", "index.js"]