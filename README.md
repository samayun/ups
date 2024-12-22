# Unified Payment System
<img width="1071" alt="banks" src="https://github.com/user-attachments/assets/842c1c80-7ecb-4524-a536-50e21601778f" />



# Requirements

- Node version `18.17.0`

# Installation

- Copy `.env.example` file and rename as `.env`
- Open terminal and run `docker-compose up -d` or `docker compose up -d` [based on version]
- Install pnpm `npm i -g pnpm@latest`
- Run `pnpm install`
- Run `pnpm db:push && pnpm db:seed`
- Run `pnpm dev`
- If any `.env` variable is missing just copy them from terminal and set their value as `test` or knock anyone in the group to get the actual value.
- Optional(create test user): `pnpm db:test-user`
- Check url in terminal and open `http://localhost:3001`
