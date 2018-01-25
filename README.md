# Give (Proof of Concept)

Graph Based Contributions Platform - Proof of Concept / barebones Demo powered by [IPFS](https://ipfs.io) and [Stellar](https://stellar.org)


## Getting Started

* Clone the repo locally, e.g.
```
$ git clone https://github.com/givenetwork/give.git give
```

* You need to install [Parcel](https://parceljs.org/getting_started.html) and [Yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/)

* Go to the repo, and install dependencies.
```
$ cd give
$ yarn install
```

* Run Parcel
```
$ yarn start
```

* Visit [http://localhost:1234](http://localhost:1234)



## STELLAR ACCOUNTS (TESTNET)

Both below accounts are funded.

#### GIVE LOGGING ACCOUNT (FOR REFERENCE)

Used to store the pointer to the global indexes.

Public Key	`GDLJCJA5INB6WUKTHJYUV3QYUJ7EAHJETKK4ASZBBS6WOQDERBE7DH5H`


#### GIVE 'CONTROL' ACCOUNT (FOR REFERENCE)

Use to sign TX's from user escrow accounts.

Public Key	`GBSKNMTKNHDAFOHOR5LHMRPS3KFLIPBNPYU7YMWQ2X4UCNCM5OLTTYK6`


## TODO

### POC / SBC DEMO

- [ ] As a User I can sign up and
    - publish my profile information in a JSON to a new IPFS folder,
    - together with a default channel (user portfolio), storing the CID,
    - generate a User "Main" Account on Stellar and store the CID pointer in a metadata
    - generate a User Escrow Account on Stellar and update the signatory on User Escrow Account to only allow signing TX's by our "Control Account"
    - pull channel index CID (from LOGGING ACCOUNT), and add user to the global user index (for later processing)

- [ ] As a User I can create a custom Channel
    - pull the existing channel data from my current IPFS folder,
    - update the channel information locally and publish changes to IPFS,
    - update the CID in my account to the updated one,
    - pull channel index based on the CID (from LOGGING ACCOUNT), add the channel / update the channel data in the channels.json index and republish, storing and updating the CID, incrementing a sequence # (double check the CID stored in the ledger prior to updating to ensure it hasn't been updated)

### ALPHA

- [ ] Refactor global index datastores with OrbitDb (when ready) -- add "orbit-db": "^0.19.3" to package.json
- [ ] Implement PubSub and ensure syncing to peers by a "bridge node" (storing from pubsub to default IPFS network)
- [ ] Worker to generate User Graphs in regular time intervals
- [ ] Worker to generate TX's from user escrow accounts to direct recepients based on User Graphs
- [ ] Ensure outward privacy of "what is someone donating to", while allowing central reporting and User's personal reports

### BACKLOG
- [ ] User password strategy to allow users changing their password (e.g. encrypt stellar "password" and make it updateable)
