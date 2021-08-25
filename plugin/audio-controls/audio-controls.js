/**
 * A plugin that gives ability to control audio in slides
 *
 * @author bunopus
 */
let RevealAudioController = window.RevealAudioController || (function () {

    // Reveal.addEventListener('slidechanged', function (event) {
    //     _onEvent('slidechanged', event)
    // });
    Reveal.addEventListener('fragmentshown', function (event) {
        _onEvent('fragmentshown', event)
    });
    // Reveal.addEventListener('fragmenthidden', function (event) {
    //     _onEvent('fragmenthidden', event)
    // });


    function _onEvent(event_name, event) {
        let subject;
        switch (event_name) {
            case 'slidechanged':
                subject = event.currentSlide;
                break;
            case 'fragmentshown':
            case 'fragmenthidden':
                subject = event.fragment;
        }
        let attributes = subject.attributes;
        let action = attributes["data-audio-command"]?.value;
        let target = attributes["data-audio-target"]?.value;
        switch (action) {
            case 'fade-out':
                fadeOut(target);
                break;
        }

    }
})();

function fadeOut(target) {
    const audio = $(target)[0];
    _fadeOutCallback(audio);
}

function _fadeOutCallback(audio) {
    if (audio.volume > 0.1) {
        audio.volume -= 0.1;
        console.log(audio.volume);
        setTimeout(() => _fadeOutCallback(audio), 100);
    } else {
        audio.pause()
        audio.volume = 1;
    }
}