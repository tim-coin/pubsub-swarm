var pubsub = require('./index')

const key = 'pikme-'
var swarm = pubsub(key)
var name =  makeid()

swarm.on('message', function (msg) {
  console.log(name+' >message', msg)
  setTimeout(function() {
    //process.exit(0) ;
    //swarm.leave();
}, 1000)
})

swarm.on('connected', function () {
  swarm.publish({ data: 'hello warld from ' + this.id + '!'+ this.topic})
})

console.log("I am "+ name )
setInterval(function(){
  swarm.publish({data: "Hello from us. "+ name })
},3*1000)


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
