# Give (Proof of Concept)

> Decentralized, graph-based donation/contribution distribution network. Built on the power of Stellar and GunDB. Proof of Concept powered by [Stellar](https://stellar.org) and [GunDB](http://gun.js.org/)


---

## Getting Started

* Clone the repo locally, e.g.
```
$ git clone https://github.com/givenetwork/give.git give
```

* You need to install [Parcel](https://parceljs.org/getting_started.html) and either [Yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/)

* Go to the repo folder, and _install dependencies_:
```
$ cd give
$ yarn install
```

* Run Parcel
```
$ yarn start
```

* Visit [http://localhost:1234](http://localhost:1234)


## TODO

### v0.1-poc

TODO: Rewrite based on the VueJS / GunDB refactoring.

#### USERS & CHANNELS

- [x] As a User I can sign up and
    - [ ] Store my profile information in a JSON to DB,
    - [ ] Add my first, default channel (user portfolio) to DB using UUIDv5 with key `channel/uuuid`
        - link channel to gun.user().get('channels').set
        - link to gun.user().get('default')
        - link to gun.get'org'.get('channels').set
        https://www.npmjs.com/package/uuid#version-5
    - [ ] generate a User "Main" Account on Stellar and
    - [ ] generate a User Escrow Account on Stellar and update the signatory on User Escrow Account to only allow signing TX's by our "Control Account"
    - [ ] store the User to DB with both accounts added, creation date to get.user().get('accounts')

- [ ] As a User I can create a custom Channel
    - [ ] pull the existing channel data from DB (if any), gun.get('channel/UUID')
    - [ ] update the channel information DB based on the new settings

- [ ] As a User I can see a List of All Channels
- [ ] As a User I can see my Dashboard with
  - a List of all my personal Channels (including my Default Portfolio Channel)
  - my Profile Data

- [ ] As a User I can Edit a Channel / click a link in my Dashboard to edit my Channel
  NOTE: Managing Portfolios and Channels is exactly the same.
  - [ ] As a User I can adjust the weights inside a Channel

- [ ] As a User I need to login to view protected pages
  NOTE: Redirect back to where the user wanted to go - for extra points

- [ ] As a User I can add a Channel or User to a Channel or Portfolio.
  - By visiting / clicking a URL of the type `channels/UUID/add` I
  - Get a selection of all my channels where I can "add" the specific Channel
  - gun.get('channels/UUIDofMyChannel').get('entries').get('UUID') if not existing, point it - stores the weights



#### PROCESSING AND TRANSACTIONS

- [ ] As a Network 'Admin' (I can visit a URL where) I can Parse the Tree fore User Escrow Accounts up to N levels deep or MINIMUM_FACTOR of transactions looping through the node links to get to level N

### v0.9-alpha
- [ ] Worker to generate User Graphs in regular time intervals
- [ ] Worker to generate TX's from user escrow accounts to direct recepients based on User Graphs
- [ ] Ensure outward privacy of "what is someone donating to", while allowing central reporting and User's personal reports

### BACKLOG
- [ ] User password strategy to allow users changing their password (e.g. encrypt stellar "password" and make it updateable)


---


## STELLAR ACCOUNTS (TESTNET)

Both below accounts are funded.

#### GIVE LOGGING ACCOUNT (FOR REFERENCE)

Used to store the pointer to the global indexes.

Public Key	`GDLJCJA5INB6WUKTHJYUV3QYUJ7EAHJETKK4ASZBBS6WOQDERBE7DH5H`


#### GIVE 'CONTROL' ACCOUNT (FOR REFERENCE)

Use to sign TX's from user escrow accounts.

Public Key	`GBSKNMTKNHDAFOHOR5LHMRPS3KFLIPBNPYU7YMWQ2X4UCNCM5OLTTYK6`


---

`vue-parcel-starterkit` is inspired by [vue-parcel-example](https://github.com/rohitkrai03/vue-parcel-example).
The main difference is that this starterkit supports Vue single file components.

# Requirements

- Node >= v8
- [Parcel](https://parceljs.org)

# What's in the box?

- [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
- [stylelint](https://github.com/stylelint/stylelint)
- [parcel-plugin-vue](https://github.com/lc60005457/parcel-plugin-vue)

# Getting started

Clone this repository, and run `npm install`.

**Development**
```bash
npm run dev
```

**Production**
```bash
npm run build
```
