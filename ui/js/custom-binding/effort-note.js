(function (ko) {

  ko.bindingHandlers.effortNote = {

    init: function (element, valueAccessor, allBindingsAccessor) {
      var div,
          textarea;

      element.classList.add('effort-note');

      div = document.createElement('div');
      div.addEventListener('dblclick', function () {
        element.classList.add('active');
        textarea.select();
      });
      div.innerText = valueAccessor()();
      element.appendChild(div);

      textarea = document.createElement('textarea');
      textarea.addEventListener('blur', function () {
        element.classList.remove('active');
      });
      textarea.addEventListener('keydown', function (e) {
        switch (e.which) {
          case 13:
            if (e.shiftKey) {
              break;
            }
          case 9:
          case 27:
            element.classList.remove('active');
            e.preventDefault();
            textarea.blur();
            break;
        }
      });
      element.appendChild(textarea);

      ko.bindingHandlers.value.init(textarea, valueAccessor, allBindingsAccessor);
      ko.bindingHandlers.text.init(div, valueAccessor, allBindingsAccessor);
    },

    update: function (element, valueAccessor, allBindingsAccessor) {
      var div = element.querySelector('div'),
          textarea = element.querySelector('textarea');

      if (!valueAccessor()()) {
        valueAccessor()('--');
      }

      ko.bindingHandlers.value.update(textarea, valueAccessor, allBindingsAccessor);
      ko.bindingHandlers.text.update(div, valueAccessor, allBindingsAccessor);
    }

  }

}(window.ko));