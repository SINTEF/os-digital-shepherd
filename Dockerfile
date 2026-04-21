FROM node:22 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY ./ /app/
# TODO: one day the errors will be gone
#RUN npm run build
RUN npm run devbuild

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
