import Ipfs from 'ipfs';

// TODO: Implement OrbitDb later
// import OrbitDB from 'orbit-db';

export default class Database {

    constructor() {

      let ipfs

      const ipfsOptions = {
        EXPERIMENTAL: {
          pubsub: true
        },
      }

      this.ipfs = new Ipfs(ipfsOptions)
      window.Buffer = this.ipfs.types.Buffer

      this.ipfs.on('error', (e) => console.log(e))
      this.ipfs.on('ready', async () => {
        this.ipfs.id(function (err, identity) {
          if (err) {
            throw err
          }
          console.log("IPFS Ready", identity)
        })
      })
    }

}
