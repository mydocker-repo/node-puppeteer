# 彻底放弃 CentOS 7，直接用官方推荐的 Alpine
FROM node:20-alpine

# 安装系统自带的 chromium 和必要字体库
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# 告诉 puppeteer 别自己下载了，用系统的
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .
CMD ["node", "index.js"]
