FROM node:18-slim as base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE $PORT
RUN npm i npm@latest -g
USER node
WORKDIR /opt/node_app/app
COPY --chown=node:node . .
ENV PATH /opt/node_app/node_modules/.bin:$PATH

FROM base as non-prod
ARG NODE_ENV=non-prod
ENV NODE_ENV=${NODE_ENV}
RUN npm ci && npm cache clean --force && mv node_modules ../ && mkdir node_modules 

FROM non-prod as dev
EXPOSE 9229 9230
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
CMD ["nodemon", "--exec", "etsc && node ./dist/index.js", "--inspect=0.0.0.0:9229", "./src/index.ts"]

FROM non-prod as test
ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}
RUN npm run lint
RUN npm run format:check
CMD ["npm", "run", "test"] 


# default, production
FROM base as prod
RUN npm ci --ignore-scripts && mv node_modules ../ && mkdir node_modules 
RUN ["npm", "build"]
CMD ["node", "./dist/index.js"]

