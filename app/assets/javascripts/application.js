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
  for (var i = ($("nn:contains('http')").length - 1); i > -1; i--) {
    $("nn:contains('http')")[i].outerHTML = "<span class='http'>http</span>";
  }

  var nounCount = $("nn").length;
  var adjCount = $("jj").length;
  var verbCount = $("vb").length;
  var adverbCount = $("rb").length;
  var newNouns = [];
  var newVerbs = [];
  var newAdjectives = [];
  var newAdverbs = [];
  var verbList = [];
  var adverbList = [];
  var nounList = [];
  var adjList = [];

  for (var i = 0; i < nounCount; i++) {
    var temp = $("nn")[i].outerHTML;
    nounList.push(temp);
    $('.inputs').append("<div class='inputContainer'>" + nounList[i] + '<button class="buttons" onclick="randomWord(randomNouns, this)">?</button></div>');
  }
  for (var i = 0; i < adjCount; i++) {
    var temp = $("jj")[i].outerHTML;
    adjList.push(temp);
    $('.inputs').append("<div class='inputContainer'>" + adjList[i] + '<button class="buttons" onclick="randomWord(randomAdjectives, this)">?</button></div>');
  }
  for (var i = 0; i < verbCount; i++) {
    var temp = $("vb")[i].outerHTML;
    verbList.push(temp);
    $('.inputs').append("<div class='inputContainer'>" + verbList[i] + '<button class="buttons" onclick="randomWord(randomVerbs, this)">?</button></div>');
  }
  for (var i = 0; i < adverbCount; i++) {
    var temp = $("rb")[i].outerHTML;
    adverbList.push(temp);
    $('.inputs').append("<div class='inputContainer'>" + adverbList[i] + '<button class="buttons" onclick="randomWord(randomAdverbs, this)">?</button></div>');
  }

  $("nn").replaceWith("<input class = 'noun' style='display: inline;' type='text' placeholder='NOUN'></input>");
  $("jj").replaceWith("<input class = 'adjective' style='display: inline;' type='text' placeholder='ADJECTIVE'></input>");
  $("vb").replaceWith("<input class = 'verb' style='display: inline;' type='text' placeholder='VERB'></input>");
  $("rb").replaceWith("<input class = 'adverb' style='display: inline;' type='text' placeholder='ADVERB'></input>");
  $('.submit').click(function() {

    for (var k = ($('input').length / 2); k < $('input').length; k++) {
      if ((k == ($('input').length - 1)) && ($('input')[k].value.trim().length > 0)) {
        for (var i = 0, j = nounCount; i < nounCount; i++, j++) {
          var temp = $('.noun')[j].value;
          newNouns.push(temp);
          $('.noun')[i].outerHTML = ("<span class='noun'>" + temp + "</span>");
        }
        for (var i = 0, j = adjCount; i < adjCount; i++, j++) {
          var temp = $('.adjective')[j].value;
          newAdjectives.push(temp);
          $('.adjective')[i].outerHTML = ("<span class='adjective'>" + temp + "</span>");
        }
        for (var i = 0, j = verbCount; i < verbCount; i++, j++) {
          var temp = $('.verb')[j].value;
          newVerbs.push(temp);
          $('.verb')[i].outerHTML = ("<span class='verb'>" + temp + "</span>");
        }
        for (var i = 0, j = adverbCount; i < adverbCount; i++, j++) {
          var temp = $('.adverb')[j].value;
          newAdverbs.push(temp);
          $('.adverb')[i].outerHTML = ("<span class='adverb'>" + temp + "</span>");
        }
        $('.inputs').remove();
        $('.submit').remove();
        $('.error').text("");
        $('.hide').slideDown();

      } else if ($('input')[k].value.trim().length < 1) {
        $('.error').text("please fill out all fields!");
        return;
      }
      console.log(k);
    }

  });

  $('.shareArrow').click(function() {
    // html2canvas($('.madlib')[0], {
    //   onrendered: function(canvas) {
    //     document.body.appendChild(canvas);
    //   }
    // });
    //
    // var image = new Image();
    // image.src = $('canvas')[0].toDataURL("image/png");
    // document.body.appendChild(image);

    var cleanText = $('.tweet')[0].innerText.replace(" :", ":").replace("# ", "#").replace(" !", "!").replace(" '", "'").replace(" ,", ",").replace(" .", ".")
      .replace(" )", ")").replace("( ", "(").replace(" ?", "?");
    var encodedTweet = encodeURIComponent(cleanText);

    window.open(("http://www.twitter.com/share/?text=" + encodedTweet + "%20%23MadLiberated"), '_blank');

  })

  $('.nextArrow').click(function() {
    window.location = "/";
  });

  $('.burger').click(function() {
    $('.dropdown').slideToggle();
  });

  $('.toggleArrow').click(function() {
    toggleOriginal(nounList, adjList, adverbList, verbList, newNouns, newAdjectives, newAdverbs, newVerbs, count);
    count++;
  })

  $("input.noun").siblings("button").hover(function() {
    $('.info')[0].innerText = "a word used to identify a class of people, places, or things";
    $('.info').slideToggle();
  });

  $("input.adverb").siblings("button").hover(function() {
    $('.info')[0].innerText = "a word that describes a verb, an adjective, or another adverb";
    $('.info').slideToggle();
  });

  $("input.adjective").siblings("button").hover(function() {
    $('.info')[0].innerText = "a word that describes a noun or a pronoun";
    $('.info').slideToggle();
  });

  $("input.verb").siblings("button").hover(function() {
    $('.info')[0].innerText = "a word that expresses an action, an occurrence, or a state of being";
    $('.info').slideToggle();
  });

  var count = 0;

  //Enable swiping...
  $(".madlib").swipe({
    //Generic swipe handler for all directions
    swipeLeft: function(event, direction, distance, duration, fingerCount) {
      window.location = "/";
    },
    swipeRight: function(event, direction, distance, duration, fingerCount) {
      var cleanText = $('.tweet')[0].innerText.replace(" :", ":").replace("# ", "#").replace(" !", "!").replace(" '", "'").replace(" ,", ",").replace(" .", ".")
        .replace(" )", ")").replace("( ", "(").replace(" ?", "?");
      var encodedTweet = encodeURIComponent(cleanText);

      window.open(("http://www.twitter.com/share/?text=" + encodedTweet + "%20%23MadLiberated"), '_blank');
    },
    swipeDown: function(event, direction, distance, duration, fingerCount) {
      console.log(count);
      toggleOriginal(nounList, adjList, adverbList, verbList, newNouns, newAdjectives, newAdverbs, newVerbs, count);
      count++;
    },
    pinchOut:function(event, direction, distance, duration, fingerCount, pinchZoom)
        {
          for (var i = 0; i < nounCount; i++) {
            var temp = $("nn")[i].outerHTML;
            nounList.push(temp);
            randomWord(randomNouns, this);
          }
          for (var i = 0; i < adjCount; i++) {
            var temp = $("jj")[i].outerHTML;
            adjList.push(temp);
            randomWord(randomAdjectives, this);
          }
          for (var i = 0; i < verbCount; i++) {
            var temp = $("vb")[i].outerHTML;
            verbList.push(temp);
            randomWord(randomVerbs, this);
          }
          for (var i = 0; i < adverbCount; i++) {
            var temp = $("rb")[i].outerHTML;
            adverbList.push(temp);
            randomWord(randomAdverbs, this);
          }
        },

  });


});

function randomWord(array, button) {

  function runRandomWord() {
    var length = array.length;
    var randomNumber = Math.floor(Math.random() * length);
    $(button).parent().find('input')[0].value = array[randomNumber];
  }
  runRandomWord();
}

function toggleOriginal(realNoun, realAdj, realAdv, realVerb, newNoun, newAdj, newAdv, newVerb, count) {

  if (count % 2 == 0) {
    for (var i = 0; i < realNoun.length; i++) {
      $('.noun')[i].outerHTML = ("<span class='noun'>" + realNoun[i] + "</span>");
    }
    for (var i = 0; i < realAdj.length; i++) {
      $('.adjective')[i].outerHTML = ("<span class='adjective'>" + realAdj[i] + "</span>");
    }
    for (var i = 0; i < realVerb.length; i++) {
      $('.verb')[i].outerHTML = ("<span class='verb'>" + realVerb[i] + "</span>");
    }
    for (var i = 0; i < realAdv.length; i++) {
      $('.adverb')[i].outerHTML = ("<span class='adverb'>" + realAdv[i] + "</span>");
    }
  } else {
    for (var i = 0; i < newNoun.length; i++) {
      $('.noun')[i].outerHTML = ("<span class='noun'>" + newNoun[i] + "</span>");
    }
    for (var i = 0; i < newAdj.length; i++) {
      $('.adjective')[i].outerHTML = ("<span class='adjective'>" + newAdj[i] + "</span>");
    }
    for (var i = 0; i < newVerb.length; i++) {
      $('.verb')[i].outerHTML = ("<span class='verb'>" + newVerb[i] + "</span>");
    }
    for (var i = 0; i < newAdv.length; i++) {
      $('.adverb')[i].outerHTML = ("<span class='adverb'>" + newAdv[i] + "</span>");
    }
  }
}
