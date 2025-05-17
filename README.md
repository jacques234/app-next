This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Instalar next-auth y prisma

```bash
pnpm add next-auth @prisma/client
pnpm add -D prisma
pnpm add @next-auth/prisma-adapter
```

## Migraciones de prisma
```bash
npx prisma init
npx prisma migrate dev --name init
```

## Generar llaves

```bash
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```