FROM node:20.3-slim

WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production

# Copy app
COPY src ./src

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost:3000/maxspeed?lat=0&lon=0 || exit 1

CMD ["node", "src/index.js"]