FROM hub.lumigame.com/base/playwright:v1.24.0-focal

ARG GAME_ID
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH


COPY tests/games/${GAME_ID}-* /app/tests/games
COPY tests/_shared /app/tests
COPY tests/core /app/tests
COPY tests/lobby /app/tests
COPY playwright.config.ts .
COPY package.json .

RUN npm install \
    && npx playwright@1.24 install chromium