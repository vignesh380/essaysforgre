function acceptFunction() {
    $.ajax({url:'/storeReviewEssay'}).done(function() {
    window.location.href = "/";
  });
  console.log('on click of accept - Custom JS');
}