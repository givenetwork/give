import Ipfs from 'ipfs';

// TODO: Implement OrbitDb later
// import OrbitDB from 'orbit-db';

export default() => {

    let ipfs, orbitdb, db

    const ipfsOptions = {
      EXPERIMENTAL: {
        pubsub: true
      },
    }

    ipfs = new Ipfs(ipfsOptions)
    window.Buffer = ipfs.types.Buffer

    ipfs.on('error', (e) => console.log(e))
    ipfs.on('ready', async () => {
      ipfs.id(function (err, identity) {
        if (err) {
          throw err
        }
        console.log("IPFS Ready", identity)
      })
    })

}
