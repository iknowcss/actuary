(function (ko) {

  var BUTTON_TEMPLATE = '<button><span>&nbsp;</span></button>',
      msPointerEnabled = !!navigator.pointerEnabled || navigator.msPointerEnabled,
      isTouch = (!!('ontouchstart' in window) && navigator.userAgent.indexOf('PhantomJS') < 0) || msPointerEnabled;

  ko.bindingHandlers.effortRating = {

    init: function (element, valueAccessor) {
      var $element = $(element),
          $button,
          i;

      // Give this element the effort-rating class
      $element.addClass('effort-rating');

      // Create the "clear" button
      $button = $(BUTTON_TEMPLATE).addClass('effort-clear');
      addClickEvent($button, function () { valueAccessor()(0); });
      $element.append($button);

      // Add each of the effort bubbles
      for (i = 0; i < 3; i++) {
        $button = $(BUTTON_TEMPLATE).addClass('effort-bubble');
        addClickEvent($button, (function (idx) {
          valueAccessor()(idx + 1);
        }).bind(null, i));
        $element.append($button);
      }

      $element.data('effort-bubbles', $element.find('button.effort-bubble'));
    },

    update: function (element, valueAccessor) {
      var $element = $(element),
          $buttons = $element.data('effort-bubbles'),
          rating = valueAccessor()(),
          currentRatingClass;

      // Fill in the bubbles up to the rating
      $buttons
        .filter(function (i) { return i < rating; })
        .addClass('active');

      // Remove the rest
      $buttons
        .filter(function (i) { return i >= rating; })
        .removeClass('active');

      // Set the rating of the main element to colorize the bubbles
      currentRatingClass = element.className.toString().match(/rating-\d+/);
      if (currentRatingClass) {
        $element.removeClass(currentRatingClass[0]);
      }
      $element.addClass('rating-' + rating);
    }

  }

  function addClickEvent($element, fn) {
    function handler(e) {
      if (e) {
        e.preventDefault();
        if (e.target) {
          e.target.blur();
        }
      }
      fn.apply(null, arguments);
    }

    if (isTouch) {
      $element.on('click', function (e) { e.preventDefault(); });
    }
    $element.on(isTouch ? 'tap' : 'click', handler);
  }

}(window.ko));