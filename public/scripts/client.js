/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=>{
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const renderTweets = function(tweets) {
    for (let tweet of tweets){
      const $tweet1 = createTweetElement(tweet);
      console.log($tweet1);
      $('#tweets').append($tweet1); 
    }
  }
  
  const createTweetElement = function(tweet) {
    let today = new Date;
    console.log(today.getTime(), tweet.created_at);
    let nDay = Math.round((today.getTime() - tweet.created_at)/(1000 * 3600 * 24));
    let $tweet = `<article class="tweet">
                  <header>
                    <img src="${tweet.user.avatars}" />
                    <span>${tweet.user.name}</span>
                    <a href="#">${tweet.user.handle}</a>
                  </header>
                  <p>${tweet.content.text}</p>
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
  }
  
  renderTweets(data);

  $('#tweetForm').on('submit', (evt) => {
    evt.preventDefault();
    $.ajax({
        url: '/tweets/',
        method: 'POST',
        dataType: 'JSON',
        data : $(this).serialize()
    }).then(function(response) {
        console.log(response);
        $('#tweets').empty();
        renderTweets(response);
    })
  })

}); 
