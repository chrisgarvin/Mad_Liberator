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

// var randomNouns =["denim shorts", "duck egg", "shark", "selfie stick", "dog treat"];
// var randomAdjectives =["fluttering", "cozy", "steaming", "moist", "sticky", "squishy", "gigantic", "ratchet"];
var randomVerbs =["google", "rap", "shout", "tickle", "pick", "cook", "fluff"];
// var randomAdverbs = ["quick", "slow", "angrily", "drunkenly", "giddily", "vibrantly"];

$(document).ready(function() {
  for(var i = ($("nn:contains('http')").length - 1); i > -1; i--){
  $("nn:contains('http')")[i].outerHTML = "http";
}

  var nounCount = $("nn").length;
  var adjCount = $("jj").length;
  var verbCount = $("vb").length;
  var adverbCount = $("rb").length;
  var verbList = [];
  var adverbList = [];
  var nounList = [];
  var adjList = [];

  for(var i = 0; i < nounCount; i++){
    var temp = $("nn")[i].outerHTML;
    nounList.push(temp);
    $('.inputs').append("<div class='inputContainer'>" + nounList[i]
    + '<button class="buttons" onclick="randomWord(randomNouns, this)">?</button></div>');
  }
  for(var i = 0; i < adjCount; i++){
    var temp = $("jj")[i].outerHTML;
    adjList.push(temp);
    $('.inputs').append("<div class='inputContainer'>" + adjList[i]
    + '<button class="buttons" onclick="randomWord(randomAdjectives, this)">?</button></div>');
  }
  for(var i = 0; i < verbCount; i++){
    var temp = $("vb")[i].outerHTML;
    verbList.push(temp);
    $('.inputs').append("<div class='inputContainer'>" + verbList[i]
    + '<button class="buttons" onclick="randomWord(randomVerbs, this)">?</button></div>');
  }
  for(var i = 0; i < adverbCount; i++){
    var temp = $("rb")[i].outerHTML;
    adverbList.push(temp);
    $('.inputs').append("<div class='inputContainer'>" + adverbList[i]
    + '<button class="buttons" onclick="randomWord(randomAdverbs, this)">?</button></div>');
  }

$("nn").replaceWith("<input class = 'noun' style='display: inline;' type='text' placeholder='NOUN'></input>");
$("jj").replaceWith("<input class = 'adjective' style='display: inline;' type='text' placeholder='ADJECTIVE'></input>");
$("vb").replaceWith("<input class = 'verb' style='display: inline;' type='text' placeholder='VERB'></input>");
$("rb").replaceWith("<input class = 'adverb' style='display: inline;' type='text' placeholder='ADVERB'></input>");
  $('.submit').click(function(){

    for(var k = ($('input').length / 2); k < $('input').length; k++){
      if((k == ($('input').length - 1)) && ($('input')[k].value.trim().length > 0)){
        for(var i = 0, j = nounCount; i < nounCount; i++,j++){
          var temp = $('.noun')[j].value;
          $('.noun')[i].outerHTML = ("<span class='noun'>" + temp + "</span>");
        }
        for(var i = 0, j = adjCount; i < adjCount; i++,j++){
          var temp = $('.adjective')[j].value;
          $('.adjective')[i].outerHTML = ("<span class='adjective'>" + temp + "</span>");
        }
        for(var i = 0, j = verbCount; i < verbCount; i++,j++){
          var temp = $('.verb')[j].value;
          $('.verb')[i].outerHTML = ("<span class='verb'>" + temp + "</span>");
        }
        for(var i = 0, j = adverbCount; i < adverbCount; i++,j++){
          var temp = $('.adverb')[j].value;
          $('.adverb')[i].outerHTML = ("<span class='adverb'>" + temp + "</span>");
        }
        $('.inputs').remove();
        $('.error').text("");
        $('.hide').slideDown();
      } else if ($('input')[k].value.trim().length < 1){
        $('.error').text("please fill out all fields!");
        return;
      }
        console.log(k);
      }
    });

  $('.burger').click(function(){
    $('.dropdown').slideToggle();
  });

});

function randomWord(array,button){

  function runRandomWord(){
      var length = array.length;
      var randomNumber = Math.floor(Math.random() * length);
      $(button).parent().find('input')[0].value = array[randomNumber];
  }
  runRandomWord();
}
