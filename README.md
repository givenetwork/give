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

#### USERS & CHANNELS

- Create a new channel
- Edit a channel (paste existing Key to import existing JSON data)
- After creating/editing a channel, instructions how to save:
  - GitHub
  - IPFS
  - Twitter (if easy to do)
  - Anywhere
- Set a default Channel for your Stellar Account

- Channel portfolio page (?)
- Add a channel (with channel key - can be from Anywhere)

- All Channels (Give repo JSON)
  - File format for github pulls: https://github.com/user/repository/raw/branch/filename

- Process Account Graph /process/StellarAccount -> prepare 1-to-1 TXN's and sign them


#### PROCESSING AND TRANSACTIONS

- [ ] As a Network 'Admin' (I can visit a URL where) I can Parse the Tree fore User Escrow Accounts up to N levels deep or MINIMUM_FACTOR of transactions looping through the node links to get to level N


----


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
