# syntax=docker/dockerfile:1

# ---- Stage 1: deps (instala dependências a partir do lock) ----
FROM node:22-alpine AS deps
WORKDIR /app
# libc6-compat: alguns binários nativos precisam no alpine
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# ---- Stage 2: builder (gera o build standalone) ----
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Variáveis NEXT_PUBLIC_* são embutidas AQUI, no build (não em runtime).
# Se precisar de alguma, passe com --build-arg e descomente:
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

# ---- Stage 3: runner (imagem final enxuta) ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# o output standalone já traz o server.js + só as deps que o Next usa.
# usa o usuário "node" que já vem na imagem oficial (roda non-root, igual ao exemplo oficial do Next)
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

# server.js é gerado pelo output: "standalone" — mantém SSR, next/image, ISR, API routes
CMD ["node", "server.js"]
