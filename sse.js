var clients = {};

module.exports = {

  handle: function(r, s){
    s.setHeader('Content-Type', 'text/event-stream');
    s.setHeader('Access-Control-Allow-Origin', '*');
    var id = (r.cookies && r.cookies.t) || Date.now();
    clients[id] = s;
    r.on('close', function(){
      delete clients[id];
    });
  },

  send: function(msg){
      if(typeof msg !== 'string') msg = JSON.stringify(msg);
      for(i in clients){
        clients[i].write('data:'+msg+'\n\n');
  	  }    
  },
  
  sendTo: function(cli, msg){
    if(typeof msg !== 'string') msg = JSON.stringify(msg);
    clients[cli].write('data:'+msg+'\n\n');
  }
  
}
