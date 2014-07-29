(function (ko) {

  ko.bindingHandlers.autocomplete = {

    init: function (element, valueAccessor, allBindingsAccessor) {
      var items = ko.utils.unwrapObservable(valueAccessor()),
          inputWidth = element.offsetWidth,
          inputHeight = element.offsetHeight,
          inputRectangle = element.getBoundingClientRect(),
          ul,
          ulRectangle,
          currentItem,
          lis = [];

      function filterList() {
        var value = ko.utils.unwrapObservable(allBindingsAccessor().value),
            currentWasFiltered = false;
        lis.forEach(function (li) {
          if (li.innerText.indexOf(value) == 0) {
            li.classList.remove('filtered');
          } else {
            li.classList.add('filtered');
            if (li.innerText == currentItem) {
              currentWasFiltered = true;
            }
          }
        });
        if (currentWasFiltered) {
          if (!highlightNext(-1)) {
            highlightNext(1);
          }
        }
      }

      function highlight(item) {
        if (item instanceof Event) {
          switch (item.which) {
            case 40:
              highlightNext(1);
              break;
            case 38:
              highlightNext(-1);
              break;
            default: return;
          }
          item.preventDefault();
          return;
        }

        lis.forEach(function (li) {
          if (li.innerText == item) {
            currentItem = item;
            li.classList.add('highlighted');
          } else {
            li.classList.remove('highlighted');
          }
        });
      }

      function highlightNext(n) {
        var nextIndex,
            i;
        for (i = items.indexOf(currentItem) + n; i < lis.length; i += n) {
          if (i >= items.length || i < 0) {
            break;
          }
          if (!lis[i].classList.contains('filtered')) {
            highlight(lis[i].innerText);
            return true;
          }
        }
        return false;
      }

      function open() {
        ul.classList.add('active');
        filterList();
        if (!currentItem) {
          highlightNext(1);
        }
      }

      function close(e) {
        ul.classList.remove('active');
      }

      element.addEventListener('focus', open);
      element.addEventListener('blur', close);
      element.addEventListener('keydown', highlight);
      allBindingsAccessor().value.subscribe(filterList);

      element.insertAdjacentHTML('afterend', '<ul class="input-autocomplete"></ul>');
      ul = element.nextElementSibling;
      ulRectangle = ul.getBoundingClientRect();
      ul.style.width = inputWidth + 'px';
      ul.style.marginTop = (inputHeight + 1) + 'px';
      ul.style.marginLeft = (inputRectangle.left - ulRectangle.left) + 'px';

      items.forEach(function (item) {
        var li = document.createElement('li');
        li.innerText = item;
        ul.appendChild(li);
        li.addEventListener('mousedown', function () {
          allBindingsAccessor().value(item);
          allBindingsAccessor().value.notifySubscribers(item, 'autocomplete');
        });
        li.addEventListener('mouseover', function () {
          highlight(item);
        });
        lis.push(li);
      });
    },

    update: function (element, valueAccessor, allBindingsAccessor) {
      // Not implemented yet
    }

  }

}(window.ko));