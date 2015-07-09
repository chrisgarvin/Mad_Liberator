// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {

  var nounCount = $("nn").length;
  var adjCount = $("jj").length;
  var nounList = [];
  var adjList = [];

  for(var i = 0; i < nounCount; i++){
    var temp = $("nn")[i].outerHTML;
    nounList.push(temp);
    $('.inputs').append(nounList[i]);
  }
  for(var i = 0; i < adjCount; i++){
    var temp = $("jj")[i].outerHTML;
    adjList.push(temp);
    $('.inputs').append(adjList[i]);
  }

  console.log(nounList);
  console.log(adjList);

$("nn").replaceWith("<input class = 'input' style='display: inline-block;' type='text' placeholder='NOUN'></input>");
$("jj").replaceWith("<input class = 'input' style='display: inline-block;' type='text' placeholder='ADJECTIVE'></input>");
  $('.submit').click(function(){
    console.log('hi')
    $('.tweet').css("color","rgb(95, 205, 250)");
  })

  $('.burger').click(function(){
    $('.dropdown').slideToggle();
  })

});
