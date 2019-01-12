var swarm = require('discovery-solyd')
var gossip = require('solyd-gossip')
var EventEmitter = require('events')
const crypto = require('crypto')
var util = require('util')
var defaults = require('datland-swarm-defaults')

util.inherits(Pubsub, EventEmitter)

function Pubsub (topic, opts) {
  if (!(this instanceof Pubsub)) { return new Pubsub(topic, opts) }

  if (!topic) { throw new Error('a topic must be set') }
  if (typeof topic !== 'string') { throw new Error('topic must be a string') }

  opts = opts || {}
  opts.port = opts.port || 0

  EventEmitter.call(this)

  this.gossip = gossip(opts.gossip)

  this.id = this.gossip.keys.public
  this.topic = topic
  //this.swarm = swarm()


var DAT_DOMAIN = 'dat.local'
var DEFAULT_DISCOVERY = [
  'discovery1.publicbits.org',
  'discovery2.publicbits.org'
]

var DEFAULT_BOOTSTRAP = [
  'bootstrap1.publicbits.org:6881',
  'bootstrap2.publicbits.org:6881',
  'bootstrap3.publicbits.org:6881',
  'bootstrap4.publicbits.org:6881'
]
const myId =  crypto.randomBytes(32)


this.swarm = swarm({
    id:myId,
    dns: {server: DEFAULT_DISCOVERY, domain: DAT_DOMAIN},
    dht: {bootstrap: DEFAULT_BOOTSTRAP}
  })


  this.swarm.join(topic)

  var firstConn = false

  var self = this
  this.swarm.on('connection', function (connection) {
    //console.log('found + connected to peer')
    var g = self.gossip.createPeerStream()
    connection.pipe(g).pipe(connection)

    if (!firstConn && this.connections.length === 1) {
      firstConn = true
      self.emit('connected')
    }
  })

  this.leave = function(){
    this.swarm.leave(topic)
  }

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
