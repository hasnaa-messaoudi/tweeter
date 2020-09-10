$(document).ready(function() {
  let textAreaValue = $("#tweet-text").val();
  $("#tweet-text").on("change keyup paste", function() {
    var currentVal = $(this).val();
    if(currentVal == textAreaValue) {
        return; //check to prevent multiple simultaneous triggers
    }

    let newCount = 140 - currentVal.length;

    if (newCount < 0) {
      $(".counter").css('color', 'red');
    } else {
      $(".counter").css('color', 'inherit');
    }
    
    $(".counter").html(newCount);

    textAreaValue = currentVal;
  });
});
