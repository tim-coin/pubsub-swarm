var swarm = require('discovery-swarm')
var gossip = require('secure-gossip')
var EventEmitter = require('events')
var util = require('util')

util.inherits(Pubsub, EventEmitter)

function Pubsub (topic, opts) {
  if (!(this instanceof Pubsub)) { return new Pubsub(topic, opts) }

  if (!topic) { throw new Error('a topic must be set') }
  if (typeof topic !== 'string') { throw new Error('topic must be a string') }

  opts = opts || {}
  opts.port = opts.port || 0

  EventEmitter.call(this)

  this.gossip = gossip()

  this.id = this.gossip.keys.public

  this.swarm = swarm()

  this.swarm.join(topic)

  var firstConn = false

  var self = this
  this.swarm.on('connection', function (connection) {
    console.log('found + connected to peer')
    var g = self.gossip.createPeerStream()
    connection.pipe(g).pipe(connection)

    if (!firstConn && this.connections.length === 1) {
      firstConn = true
      self.emit('connected')
    }
  })

  // TODO: fire event when you have no peers left
  // ...

  this.swarm.listen(opts.port)

  this.gossip.on('message', function (msg) {
    self.emit('message', msg)
  })

  this.publish = function (msg) {
    self.gossip.publish(msg)
  }
}

module.exports = Pubsub
