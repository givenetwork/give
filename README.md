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

### PROOF OF CONCEPT / DEMO


#### USERS & CHANNELS

- [ ] As a User I can sign up and
    - [ ] publish my profile information in a JSON to a new IPFS folder,
    - [ ] together with a default channel (user portfolio), storing the CID,
    - [ ] generate a User "Main" Account on Stellar and store the CID pointer in a metadata
    - [ ] generate a User Escrow Account on Stellar and update the signatory on User Escrow Account to only allow signing TX's by our "Control Account"
    - [ ] pull channel index CID (from LOGGING ACCOUNT), and add user to the global user index (for later processing)

- [ ] As a User I can create a custom Channel
    - [ ] pull the existing channel data from my current IPFS folder,
    - [ ] update the channel information locally and publish changes to IPFS (using `ipfs.dag.put`),
    - [ ] update the CID in my account to the updated one,
    - [ ] pull channels.json index of all channels from the recent CID metadata from LOGGING ACCOUNT; add the channel and/or update the channel data in the channels.json, increment the sequence # and republish, storing the CID; (double check the CID stored in the ledger prior to updating to ensure it hasn't been updated); update the CID in LOGGING accout with the new one

Note: Managing Portfolios and Channels is exactly the same.

- [ ] As a User I can see a List of all my personal Channels (including my Default Portfolio Channel)
- [ ] As a User I can Edit a Channel
- [ ] As a User I can see a List of All Channels
- [ ] As a User I can add a Channel or User to a Channel or Portfolio. (NOTE: We will call this a Vector with a TARGET ID and WEIGHT.)
- [ ] As a User I can adjust the weights of a Channel Vector

#### PROCESSING AND TRANSACTIONS

- [ ] As a Network 'Admin' (I can visit a URL where) I can Parse the Tree fore User Escrow Accounts up to N levels deep or MINIMUM_FACTOR of transactions, using `ipfs.dag.tree` and/or looping through the node links to get to level N

```
JSON TBD
```

- [ ] As a Network 'Admin' (I can visit a URL where) I can Generate the Matrix of 1-to-1 Transactions for User Escrow Accounts, for example:
```
// ipfs/MASTER_CID/txmatrix_someusername.json
{
  "STELLARACCOUNTPUBKEY1": 250,
  "STELLARACCOUNTPUBKEY2": 0.15,
  "STELLARACCOUNTPUBKEY3": 0.05,
  "STELLARACCOUNTPUBKEY4": 0.02,
  "STELLARACCOUNTPUBKEY5": 0.01,
  "STELLARACCOUNTPUBKEY6": 0.01,
  "STELLARACCOUNTPUBKEY6": 0.0088,
  ...
}
```


### ALPHA

- [ ] Refactor global index datastores with OrbitDb (when ready) -- add "orbit-db": "^0.19.3" to package.json
- [ ] Implement PubSub and ensure syncing to peers by a "bridge node" (storing from pubsub to default IPFS network)
- [ ] Worker to generate User Graphs in regular time intervals
- [ ] Worker to generate TX's from user escrow accounts to direct recepients based on User Graphs
- [ ] Ensure outward privacy of "what is someone donating to", while allowing central reporting and User's personal reports

### BACKLOG
- [ ] User password strategy to allow users changing their password (e.g. encrypt stellar "password" and make it updateable)
