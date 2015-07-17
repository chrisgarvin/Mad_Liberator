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

  // finds elements that are improperly labeled and rids of their tags to Prevent
  // from effecting future actions

  for (var i = ($("nn:contains('http')").length - 1); i > -1; i--) {
    $("nn:contains('http')")[i].outerHTML = "<span class='http'>http</span>";
  }

  // setting variables that will be used throughout

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

  // appends noun/adverb/verb/adjective tagged elements to an input container
  // which will display to ask users for words in order to fill madlib

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

  // replaces all noun/adj/verb/adverb elements with input fields that ask user
  // for particular part of speech

  $("nn").replaceWith("<input class = 'noun' style='display: inline;' type='text' placeholder='NOUN'></input>");
  $("jj").replaceWith("<input class = 'adjective' style='display: inline;' type='text' placeholder='ADJECTIVE'></input>");
  $("vb").replaceWith("<input class = 'verb' style='display: inline;' type='text' placeholder='VERB'></input>");
  $("rb").replaceWith("<input class = 'adverb' style='display: inline;' type='text' placeholder='ADVERB'></input>");

  // click function on submit button

  $('.submit').click(function() {

    // first goes through to validate that there is a value entered. If any field
    // doesn't have a value, modify .element class to inform user. Otherwise set
    // values to hidden tweet div in place of old words, and remove input fields

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
    }

  });

  // click function on shareArrow img

  $('.shareArrow').click(function() {

    // setting cleanText variable which goes through the tweet and gets rid of
    // excess spaces that are present due to each word/punctuation being tagged,
    // encodes the tweet so it could be attached to a URL to share via twitter.

    var cleanText = $('.tweet')[0].innerText.replace(" :", ":").replace("# ", "#").replace(" !", "!").replace(" '", "'").replace(" ,", ",").replace(" .", ".")
      .replace(" )", ")").replace("( ", "(").replace(" ?", "?");
    var encodedTweet = encodeURIComponent(cleanText);

    window.open(("http://www.twitter.com/share/?text=" + encodedTweet + "%20%23MadLiberated"), '_blank');

  })

  // click function on nextArrow img that refreshes root page for new tweet

  $('.nextArrow').click(function() {
    window.location = "/";
  });

  // click function on nav burger to toggle dropdown menu

  $('.burger').click(function() {
    $('.dropdown').slideToggle();
  });

  // click function on toggleArrow img that runs toggleOriginal function and
  // increments count which gets passed into toggleOriginal

  $('.toggleArrow').click(function() {
    toggleOriginal(nounList, adjList, adverbList, verbList, newNouns, newAdjectives, newAdverbs, newVerbs, count);
    count++;
  })

  // hover functions for hover on random part of speech button that will show the
  // user what that particular part of speeches definition is

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

  // swipe functions on window with touchSwipe.js that are used on mobile view

  $(window).swipe({

    // swipeLeft will reload a new tweet

    swipeLeft: function(event, direction, distance, duration, fingerCount) {
      window.location = "/";
    },

    // swipeRight to share tweet

    swipeRight: function(event, direction, distance, duration, fingerCount) {
      var cleanText = $('.tweet')[0].innerText.replace(" :", ":").replace("# ", "#").replace(" !", "!").replace(" '", "'").replace(" ,", ",").replace(" .", ".")
        .replace(" )", ")").replace("( ", "(").replace(" ?", "?");
      var encodedTweet = encodeURIComponent(cleanText);

      window.open(("http://www.twitter.com/share/?text=" + encodedTweet + "%20%23MadLiberated"), '_blank');
    },

    // swipeDown to toggle original tweet and newly created tweet

    swipeDown: function(event, direction, distance, duration, fingerCount) {
      console.log(count);
      toggleOriginal(nounList, adjList, adverbList, verbList, newNouns, newAdjectives, newAdverbs, newVerbs, count);
      count++;
    },

    // swipeUp to auto fill all of the random input fields at once

    swipeUp:function(event, direction, distance, duration, fingerCount, pinchZoom)
        {
          for(var i = 0; i < $('button.buttons').length; i ++){
            $('button.buttons')[i].onclick();
          }
        }
  });

});

// randomWord function that is called onclick of the ? buttons, and returns a
// random word of the proper part of speech

function randomWord(array, button) {

  function runRandomWord() {
    var length = array.length;
    var randomNumber = Math.floor(Math.random() * length);
    $(button).parent().find('input')[0].value = array[randomNumber];
  }
  runRandomWord();
}

// toggleOriginal function that takes in the arrays of original and newly created
// that will toggle original/new tweet back and forth

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
