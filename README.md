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

1. Create link / QR / button

   - this will be one kind of source
   - add metadata
   - Generate QR code

     - build banner.

   - Notification page
     - brand name
     - notification methods

2. Subscribers. With tags. - Create - source - name - default method - method value - other methods - values - meta

   - View

     - message history
     - full profile
     - tag
     - connection history

   - edit

   - delete

   - change list / tags

3. Content [ no folder ] - list of contents [ Grid View / List View ] - text - Email template - videos
4. Campaigns

```
    - create
        - select subscribers with tags / list / filtered
        - select content
        - select method
        - [ SMS -> text , email -> email template ]
        - execute
        - track progress


   - view [ view results ] -
```

Dashboard

KPI:

- Total Subscribers
- Total Campaigns
- Total Messages

Bar chart:

- daily subscriber chart [ day / monthly / yearly ]

# passkit generator

- choose template
- logo
- company name
- image
- QR code [ modify ]

```
openssl pkcs12 -in passmaker.p12 -clcerts -nokeys -out signerCert.pem -passin pass:truebeep -legacy
openssl pkcs12 -in passmaker.p12 -nocerts -out signerKey.pem -passin pass:truebeep -passout pass:truebeep -legacy
openssl x509 -inform der -in exported-file.cer -out converted-file.pem
```

# passkit generator

```
  https://tarex.truebeepmedia.net/api/passes/apple/generate?templateId=x5xv4jn10zic43kk3ufyrtsj&customerId=rfbqkve8is5istxggoubeg0j
```
