var pubsub = require('./index')

var swarm = pubsub('foobar')

swarm.on('message', function (msg) {
  console.log('message', msg)
  setTimeout(function() { process.exit(0) }, 1000)
})

swarm.on('connected', function () {
  swarm.publish({ data: 'hello warld from ' + this.id + '!'})
})
