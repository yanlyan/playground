This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

# Prerequisite

- Node.js v14
- MySQL

# Installation

```bash
# install dependencies
yarn install

# edit the .env
TYPEORM_CONNECTION="mysql"
TYPEORM_HOST="localhost"
TYPEORM_USERNAME="username"
TYPEORM_PASSWORD="password"
TYPEORM_DATABASE="database"
TYPEORM_PORT=3306
NEXT_PUBLIC_API_URL="http://localhost:3000"

# migrate the database
yarn db:migrate

# seed the database
yarn db:seed

# run dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
