FROM hub.lumigame.com/base/playwright:v1.24.0-focal

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY tests /app/tests
COPY playwright.config.ts .
COPY package.json .

RUN npm install \
 && PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers npx playwright@1.24.0 install chromium