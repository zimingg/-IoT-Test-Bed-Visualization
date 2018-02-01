var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");

console.log("lol");

class Node {

  constructor(id, group) {
    this.id = id;
    this.group = group;
  }

}

class Link {

  constructor(source, target, value) {
    this.source = source;
    this.target = target;
    this.value = value;
  }
}

class Page {

  constructor() {
    this.nodes = [];
    this.links = [];
  }


}

// var a = new Node("i am a node!");
// console.log(a.id);

// var pagee = new Page();
// pagee.nodes.push("a");
// console.log(pagee.nodes);



app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})
app.get('/miserables.json', function (req, res) {
   fs.readFile( __dirname + "/" + "miserables.json", 'utf8', function (err, data) {
       //console.log( data );
       res.end( data );
   });
})

app.get('/file.txt', function (req, res) {
   
  fs.readFile( __dirname + "/" + "file.txt", 'utf8', function (err, data) {

      //console.log( data[0] );
      var lines = data.split('\n');

      var page = new Page();
      var current_page = new Page();
      


      var i = 0;
      while(i<lines.length){
           var is_node = true;
          
           var l = lines[i].split(' ');
          
          if (l[0] == "All"){
            page = current_page;
            current_page = new Page();
            i++;
            while(lines[i].length != 1){
                var line = lines[i].split(' ');
                if (is_node){
                  var node = new Node(line[0],1);

                  is_node = false;
                }
                else{
                  var node = new Node(line[0],5);
                }
                
                current_page.nodes.push(node);
                console.log(current_page);
                i++;
              }
          }

          else if (l[0] == "Link"){
            var link = new Link(l[2], l[4], 5);
            i++;
            while( i<lines.length ){
                if(lines[i].split(' ')[0] == ''){
                    break;
                }
            var sl = lines[i].split(' ');
            if (sl.includes('Success,')){
                current_page.links.push(link);
                //console.log("includes!!");
                  }
            i++;
                }  
            } 
          i++;
      }
      
      console.log(page);
      

      var myJSON = JSON.stringify(page);
      res.end( myJSON );
      
   });



})
//app.set('view engine', 'ejs');
//app.set('view engine', 'html');
//app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.get('/',function(req,res){
       
     res.render(__dirname + "/" +'index.html');
     console.log( "yo");
     res.end();

});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})