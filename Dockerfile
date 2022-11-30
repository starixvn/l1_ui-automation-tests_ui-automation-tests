FROM hub.lumigame.com/pentagon-base/qc-auto-image@sha256:bbfa4e65cf331011c3d04afd4a10d0e776bbd82b5e1883587674213ba9356c59

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY tests /app/tests
COPY playwright.config.ts .
COPY package.json .

RUN npm install \
 && npx playwright@1.24 install chromium