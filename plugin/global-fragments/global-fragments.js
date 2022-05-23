/**
 * A plugin which gives ability to use fragments outside slides section
 * Usage:
 * 1) Add <span class="fragment" data-global-fragment="#example-fragment"> into desired slide
 * 2) Add <div id="example-fragment"> anywhere on page
 * 3) Hide #example-fragment by default with display:none
 *
 * or you can use it with whole section
 *
 * 1) <section data-global-fragment="#example-fragment">
 *
 * Options
 * Add <span class="fragment" data-global-fragment="#example-fragment" data-options='{"blurred":true}'>
 * - blurred - blur rest of the presentation
 * 
 * @author https://github.com/bunopus
 */
let RevealGlobalFragments =
  window.RevealGlobalFragments ||
  (() => {
    const dataAttrName = "data-global-fragment";

    Reveal.addEventListener("ready", slideIsVisible);

    Reveal.addEventListener("slidechanged", slideIsVisible);

    function slideIsVisible(event) {
      hideFragments();
      changeFragmentVisibility(event.currentSlide, true);
    }

    Reveal.addEventListener("fragmentshown", (event) => {
      changeFragmentVisibility(event.fragment, true);
    });

    Reveal.addEventListener("fragmenthidden", (event) => {
      changeFragmentVisibility(event.fragment, false);
    });

    function hideFragments() {
      $("[" + dataAttrName + "]").each((i, el) => {
        changeFragmentVisibility(el, false);
      });
    }

    function changeFragmentVisibility(element, show) {
      const selector = $(element).attr("data-global-fragment");
      const options = $(element).data("options");
      if (selector) {
        $(selector).toggle(show);
        if (options && options.blurred) $(".reveal").toggleClass("blurred", show);
      }
    }
  })();
