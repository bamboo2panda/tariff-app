# First stage
# Build react app
FROM node:15.14.0-alpine as build

WORKDIR /frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci --silent
COPY ./frontend ./
RUN npm run build

# Second stage
# Copy React static files and run nginx
FROM nginx:stable-alpine
COPY --from=build /frontend/build /usr/share/nginx/html
ENV NODE_ENV=development
ENV REACT_APP_WEB_PORT=8000
CMD ["nginx", "-g", "daemon off;"]