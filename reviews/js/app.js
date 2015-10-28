
Parse.initialize("Ccg4Ny3u9oR40yiC3KFkh6AYlT3OOij6el2BRklm", "NJ28IiWi78VHkrtCpvPqahEOOxzdhSVM1XSThxQj");
$(function () {
   'use strict';

    var Review = Parse.Object.extend('Review');
    var reviewsQuery = new Parse.Query(Review);
    reviewsQuery.ascending('createAt');

   // reviewsQuery.notEqualTo('delete', true);
    var reviewsList = $('#reviews-list');

    var ratingElem = $('#rating');

    var errorMessage = $('#error-message');

    var reviews = [];

    var reviewCount = 0;
    var ratingCount = 0;

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchReviews() {
        clearError();
        reviewsQuery.find()
            .then(onData, displayError)
            .then(displayAverage)
            .always(hideSpinner);
    }

    function onData(results) {
        reviews = results;
        renderReviews();
    }

    // updates the vote when the user click upvote or downvote
    function updateVote(object, upvote) {
        object.increment("vote");
        object.save();
        if (upvote == 1) {
            object.increment("upvote");
            object.save();
        }
    }

    //updates the feedback on how many people have voted and whether the
    //review is helpful
    function updateFeedback(object,elem) {
        elem.text(object.get('upvote') + " out of " +
            (object.get('vote')) + " people found this review useful.");
    }

    function renderReviews() {
        reviewsList.empty();
        reviews.forEach(function(review) {
            reviewCount++;
            ratingCount += review.get('rating');

            var div = $(document.createElement('div'))
                .addClass('review-block')
                .addClass('col-md-12')
                .appendTo(reviewsList);

            var span = $(document.createElement('span'))
                        .addClass('title')
                        .text(review.get('title')).appendTo(div);

            // display the rating
            $(document.createElement('div'))
                .addClass('rating')
                .raty({readOnly: true,
                    score: (review.get('rating') || 1 )})
                .insertAfter(span);

            // display the content of the review
            var content = $(document.createElement('div'))
                .text(review.get('body'))
                .addClass('text')
                .appendTo(div);

            // feedback on voting
            var feedback = $(document.createElement('p'))
                            .addClass('feedback').appendTo(content);
            updateFeedback(review, feedback);

            $("<i id = 'trash-icon' class='fa fa-trash-o'></i>")
                .appendTo(span)
                .click(function() {
                    review.destroy().then(fetchReviews, displayError);
                });

            $("<i class='fa fa-thumbs-o-down thumb-icon'></i>")
                .click(function() {
                    updateVote(review, 0);
                    updateFeedback(review, feedback);
                })
                .appendTo(span);

            $("<i class='fa fa-thumbs-o-up thumb-icon'></i>")
                .click(function() {
                    updateVote(review, 1);
                    updateFeedback(review, feedback);
                })
                .appendTo(span);
        });

        displayAverage();
    }

    //when a new form is submitted, get info and store into Parse
    $('#new-review-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var bodyInput = $(this).find('[name="body"]');
        var body = bodyInput.val();

        var review = new Review();

        //No feedback at the beginning
        review.set('vote', 0);
        review.set('upvote', 0);

        review.set('title', title);
        review.set('body', body);
        review.set('rating',$('#rating').raty('score') || 0);
        review.save().then(fetchReviews, displayError).then(function() {
            titleInput.val('');
            bodyInput.val('');
            ratingElem.raty('set', {});
        });
        return false;
    });

    //calculates the average of all the reviews
    function displayAverage() {
        var average = ratingCount / reviewCount;

        $('#average-rating').addClass('rating')
            .raty({readOnly: true,
            score: (average)});
    }

    //fetch data from the server
    fetchReviews();

    ratingElem.raty();
});