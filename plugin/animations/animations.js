const animate_prefix = "animate__";
const animate_keyword = animate_prefix + "animated";

// Set animation delay if data-delay is specified
Reveal.addEventListener('ready', function ( event ) {
    $('*[data-delay]').each( function () {
        var delay = $(this).attr("data-delay");
        $(this).css("-webkit-animation-delay", delay+"s");
        $(this).css("animation-delay", delay+"s");
    });
});

// Set animation duration if data-duration is specified
Reveal.addEventListener('ready', function ( event ) {
    $('*[data-duration]').each( function () {
        var duration = $(this).attr("data-duration");
        $(this).css("-webkit-animation-duration", duration+"s");
        $(this).css("animation-duration", duration+"s");
    });
});

// Set animation count if data-count is specified
Reveal.addEventListener('ready', function ( event ) {
    $('*[data-count]').each( function () {
        var count = $(this).attr("data-count");
        $(this).css("animation-iteration-count", count);
    });
});

// Animate items that are not in a fragment
Reveal.addEventListener('slidechanged', function( event ) {
    // Animate elements that are not a fragment (or in a fragment)
    var filter = '*[data-animate]:not(.fragment):not(.fragment *)';
    $(event.currentSlide).find(filter).each( function () {
        $(this).addClass(animate_keyword);
        $(this).addClass(animate_prefix + $(this).attr('data-animate'));
    });
    $(event.previousSlide).find(filter).each( function () {
        $(this).removeClass(animate_keyword);
        $(this).removeClass(animate_prefix + $(this).attr('data-animate'));
    });
});

// Animate fragments
Reveal.addEventListener('fragmentshown', function( event ) {
    function loop(i, el) {
        if ($(el).attr('data-animate')) {
            $(el).addClass(animate_keyword);
            $(el).addClass(animate_prefix + $(el).attr('data-animate'));
        }
        $.each($(el).children().not('.fragment'), loop);
    };
    $.each(event.fragments, loop);
});

// Make the animation runnable again if fragment is hidden
Reveal.addEventListener('fragmenthidden', function( event ) {
    function loop(i, el) {
        if ($(el).attr('data-animate')) {
            $(el).removeClass(animate_keyword);
            $(el).removeClass(animate_prefix + $(el).attr('data-animate'));
        }
        $.each($(el).children().not('.fragment'), loop);
    };
    $.each(event.fragments, loop);
});