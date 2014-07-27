(function (ko) {

  var msPointerEnabled = !!navigator.pointerEnabled || navigator.msPointerEnabled,
      isTouch = (!!('ontouchstart' in window) && navigator.userAgent.indexOf('PhantomJS') < 0) || msPointerEnabled;

  ko.bindingHandlers.effortRating = {

    init: function (element, valueAccessor) {
      var button,
          i;

      // Give this element the effort-rating class
      element.classList.add('effort-rating');

      // Create the "clear" button
      
      button = document.createElement('button');
      button.classList.add('effort-clear');
      addClickEvent(button, function () { valueAccessor()(0); });
      element.appendChild(button);

      // Add each of the effort bubbles
      for (i = 0; i < 3; i++) {
        button = document.createElement('button');
        button.classList.add('effort-bubble');
        addClickEvent(button, (function (idx) {
          valueAccessor()(idx + 1);
        }).bind(null, i));
        element.appendChild(button);
      }
    },

    update: function (element, valueAccessor) {
      var buttons = element.querySelectorAll('button.effort-bubble'),
          rating = valueAccessor()(),
          currentRatingClass,
          i;

      // Fill in the bubbles up to the rating
      for (i = 0; i < buttons.length && i < rating; i++) {
        buttons[i].classList.add('active');
      }

      // Clear the rest
      for (; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }

      // Set the rating of the main element to colorize the bubbles
      currentRatingClass = element.className.toString().match(/rating-\d+/);
      if (currentRatingClass) {
        element.classList.remove(currentRatingClass[0]);
      }
      element.classList.add('rating-' + rating);
    }

  }

  function addClickEvent(element, fn) {
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
      element.addEventListener('click', function (e) { e.preventDefault(); });
    }
    element.addEventListener(isTouch ? 'tap' : 'click', handler);
  }

}(window.ko));