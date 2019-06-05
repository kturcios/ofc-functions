FROM node:10.16-alpine

RUN mkdir -p /home/app

# Add non root user
RUN addgroup -S app && adduser app -S -G app

RUN chown app /home/app

WORKDIR /home/app

USER app

COPY package.json .
RUN npm install

COPY app.js .

EXPOSE 8080

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["npm", "start"]