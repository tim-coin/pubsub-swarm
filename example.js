var pubsub = require('pubsub-swarm')

var swarm = pubsub('foobar')

swarm.on('message', function (msg) {
  console.log('message', msg)
  process.exit(0)
})

swarm.on('connected', function () {
  swarm.publish({ data: 'hello warld from ' + this.id + '!'})
})
