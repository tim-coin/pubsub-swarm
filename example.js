var pubsub = require('pubsub-swarm')

var swarm = pubsub('foobar')

swarm.on('message', function (msg) {
  console.log('message', msg)
})

swarm.on('connected', function () {
  swarm.publish({ data: 'hello warld from ' + this.id + '!'})
})
