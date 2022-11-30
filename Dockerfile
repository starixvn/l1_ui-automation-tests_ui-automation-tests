FROM hub.lumigame.com/pentagon-base/qc-auto-image@sha256:0a852fdf85ca8a6653025ad39984a6f1156bc2c2c3b36ca84064cc523c104681

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY tests /app/tests
COPY playwright.config.ts .
COPY package.json .

RUN npm install \
 && npx playwright@1.24 install chromium