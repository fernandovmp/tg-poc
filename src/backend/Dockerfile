FROM node as build
WORKDIR /app
RUN mkdir src && mkdir src/backend && mkdir src/shared
COPY package.json .
COPY src/backend/package.json src/backend/package.json
COPY src/shared/package.json src/shared/package.json
RUN yarn workspace @todo-list/backend install
COPY . .

FROM build as publish
CMD ["yarn", "workspace", "@todo-list/backend", "start"]
