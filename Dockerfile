FROM node:16.15

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs ./.next

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
