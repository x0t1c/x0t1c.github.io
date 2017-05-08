$(function() {
  
  speed = 10;
  distance = 10;
  offset = 1;
  interval = 1;

  console.log('main func: \nspeed:'+speed+'\n'+'distance:'+distance+'\n'+'offset:'+offset+'\ninterval:'+interval);
  
  
    var $document   = $(document),
        $inputRange = $('input[type="range"]');
    
    // Example functionality to demonstrate a value feedback
   function valueOutput(element) {
       var value = element.value;
           output = element.parentNode.getElementsByTagName('output')[0];
       output.innerHTML = value;
    }
  
    for (var i = $inputRange.length-1; i >= 0; i--) {
        valueOutput($inputRange[i]);
    };
  
    $document.on('input', 'input[type="range"]', function(e) {
        valueOutput(e.target);
      str = String(e.target.id) + '=' + e.target.value;
      eval(str);
      //console.log('speed:'+speed+'\n'+'distance:'+distance+'\n'+'offset:'+offset+'\ninterval:'+interval);
    });
    // end 
  
    $inputRange.rangeslider({
      polyfill: false 
    });
});

function connect(){
  RaunchWebBluetooth.RaunchWebBluetooth.discover().then((device) => {dev = device;});
}

  function stop(){
    clearTimeout(t);
    console.log('stopped');
  }
 
function m(p,s){
  dev.sendCommand(p,s);
  curpos = p;
}

  function start(){
    console.log('moving to offset: '+offset+' then starting');
    m(offset, 10);
    t = setTimeout(function() { up(); }, 1000);
  }
    
  function up(){
    pos = curpos + distance;
    if(pos>99){
      pos = 99;
    }
    //if(offset>pos){
    //  pos = offset;
    //}
    
    console.log('^ '+pos);
    m(pos,speed);
    t = setTimeout(function() { down(); }, interval);
  }


function down(){
  pos = offset;
  console.log('v '+pos);
  m(pos,speed);
  t = setTimeout(function() { up(); }, interval);
}

con = document.getElementById('console');

//console.olog = console.log;

//console.log = function(message) {
    // console.olog(message);
    //$('#console').append('<p>' + message + '</p>');
    //setTimeout(function(){ con.scrollTop =  con.scrollHeight;},100);
//};

//window.onerror = function(message, url, linenumber) {
//    console.log(message);
//}
