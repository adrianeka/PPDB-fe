FROM node:18-alpine AS builder
WORKDIR /usr/src/app

RUN apk --update --no-cache add \
    libc6-compat \
    libpng-dev \
    make \
    g++

COPY package*.json ./
RUN rm -f package-lock.json
RUN npm cache clean --force
RUN npm install --prefer-offline --no-audit

COPY . .
RUN npm run build --prefer-offline --no-audit

FROM nginx:stable-alpine
ENV TZ="Asia/Jakarta"

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html/book-recipe

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]