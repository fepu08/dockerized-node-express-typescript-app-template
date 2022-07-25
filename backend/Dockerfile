
FROM node:18 as base
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE $PORT
RUN apt-get update && apt-get install curl -y
RUN npm i npm@latest -g
RUN mkdir /opt/node_app && chown -R node:node /opt/node_app
WORKDIR /opt/node_app
USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

FROM base as dev
ENV NODE_ENV=development
ENV PATH=/opt/node_app/node_modules/.bin:$PATH
RUN npm install --only=development --ignore-scipts 
WORKDIR /opt/node_app/app
CMD ["nodemon", "--exec", "node_modules/.bin/ts-node", "./src/index.ts"]

FROM base as source
WORKDIR /opt/node_app/app
COPY --chown=node:node ./backend .

FROM source as prod
CMD ["node", "server.js"]