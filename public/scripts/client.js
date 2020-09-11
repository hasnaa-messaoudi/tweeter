/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=>{
  // loop on all tweets array to construct several tweets
  const renderTweets = function(tweets) {
    //sort tweets by created_at
    let sortedTweets = tweets.sort((a, b) => {
      return a["created_at"] < b["created_at"] ? 1 : -1;
    });

    // Loop on sorted tweets by created_at
    for (let jsonTweet of sortedTweets) {
      const $tweet = createTweetElement(jsonTweet);
      $('#tweets').append($tweet);
    }
  };
  
  //Create one tweet article html
  const createTweetElement = function(tweet) {
    let today = new Date;
    let nDay = Math.round((today.getTime() - tweet.created_at) / (1000 * 3600 * 24));
    let $tweet = `<article class="tweet">
                  <header>
                    <img src="${tweet.user.avatars}" />
                    <span>${tweet.user.name}</span>
                    <a href="#">${tweet.user.handle}</a>
                  </header>
                  <p>${escape(tweet.content.text)}</p>
                  <footer>
                    <span>${nDay} day ago</span>
                      <ul>
                        <li><img src="../images/flag.png" /></li>
                        <li><img src="../images/refresh.png" /></li>
                        <li><img src="../images/heart.png" /></li>
                      </ul>
                  </footer>
                </article>`;
                
    return $tweet;
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // Fetching tweets with Ajax
  const loadtweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    }).done(function(response) {
      //console.log("Inside LoadTweets!!",);
      $('#tweets').empty();
      $("#tweet-text").val("");
      renderTweets(response);
    });
  };

  $(() => {  
    loadtweets();
    // Adding a tweet by Submit form using Ajax
    //$('#tweetForm').on('submit', (evt) => {
    $('#tweetForm').submit(function (evt) {
      let data = $('#tweetForm').serialize();
      evt.preventDefault();
      
      let tweetText = data.split('=')[1].trim();
      tweetText = tweetText.replace(/%20/g, '');
      
      if (tweetText.length > 140) {
        displayError("tweet too long!!");
      } else if (tweetText === "" || tweetText === null) {
        displayError("No tweet to submit!!");
      } else {
        $.ajax({
          url: '/tweets',
          method: 'POST',
          //dataType: 'JSON',
          data : data
        }).done(loadtweets);
      }
    });

    // error Handling
    // Close error message
    $(".closebtn").on("click", () => {
      $("#error").remove();
      $('#alert').css({
        'border' : 'none',
        'border-width' : '0'
      });
      $('.closebtn').hide();
    });

    const displayError = function(msg) {
      $("#error").remove();
      const htmlError = `
      <span id="error">&#9888; ${msg} &#9888;</span>`;
      $('#alert').append(htmlError);
      $('#alert').css({
        'border' : 'solid red',
        'border-width' : '3px'
      });
      $('.closebtn').show();
    };
  });

  
});
