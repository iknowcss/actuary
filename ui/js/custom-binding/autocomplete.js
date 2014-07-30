(function (ko, $) {

  ko.bindingHandlers.autocomplete = {
    after: ['value', 'foreach'],

    init: function (element, valueAccessor, allBindingsAccessor) {
      var items = ko.utils.unwrapObservable(valueAccessor()),
          autocompleter = new Autocompleter(element, items),
          valueBinding = allBindingsAccessor().value;

      $.data(element, 'autocompleter', autocompleter);

      if (valueBinding) {
        if (valueBinding.subscribe instanceof Function) {
          valueBinding.subscribe(function (newValue) {
            autocompleter.filter(newValue);
          });
        }
        autocompleter.filter(ko.utils.unwrapObservable(valueBinding));
      }
    },

    update: function (element, valueAccessor, allBindingsAccessor) {
      // TODO
    }
  };

  function Autocompleter(input, items) {
    this.input = $(input);
    this.items = items || [];

    this.bindInputEvents();
    this.constructListBox();

    this.highlightedLi = ko.observable();
  }

  _.extend(Autocompleter.prototype, {

    bindInputEvents: function () {
      this.input
        .on('focus.autocompleter', $.proxy(this.open, this))
        .on('blur.autocompleter', $.proxy(this.close, this))
        .on('keydown.autocompleter', $.proxy(this.handleInputKeypress, this));
    },

    bindDropdownEvents: function () {
      var self = this;
      this.ul
        .on('mouseover.autocompleter', 'li', function (e) {
          self.highlight($(e.target));
        })
        .on('mousedown.autocompleter', 'li', function (e) {
          alert($(e.target).text());
        });
    },

    constructListBox: function () {
      this.ul = $('<ul class="input-autocomplete"></ul>').insertAfter(this.input);
      this.ul.css({
        'width'       : (this.input.outerWidth() - 2) + 'px',
        'margin-top'  : (this.input.outerHeight() + 1) + 'px',
        'margin-left' : (this.input.offset().left - this.ul.offset().left) + 'px'
      });

      _.each(this.items, function (item) {
        $('<li></li>')
            .text(item)
            .data('autocompleter-item', item)
            .appendTo(this.ul);
      }, this);

      this.lis = this.ul.find('li');
      this.bindDropdownEvents();
    },

    handleInputKeypress: function (e) {
      if (!this.ul.hasClass('active')) {
        this.open();
      } else {
        this.higlightByKeyEvent(e);
      }
    },

    highlight: function (item) {
      var newHighlightedLi;

      this.lis.removeClass('highlighted');
      if (item instanceof $) {
        newHighlightedLi = item.addClass('highlighted');
      } else {
        this.lis.each(function (li) {
          if (!newHighlightedLi && $.data(this, 'autocompleter-item') == item) {
            newHighlightedLi = $(this).addClass('highlighted');
          }
        });
      }

      this.highlightedLi(newHighlightedLi);
    },

    unhighlight: function () {
      this.highlightedLi(null);
      this.lis.removeClass('highlighted');
    },

    pauseFiltering: function () {
      this.pauseFilter = true;
    },

    enableFiltering: function () {
      this.pauseFilter = false;
    },

    setInputValToHighlightedItem: function () {
      this.input.val(this.highlightedLi().data('autocompleter-item'));
    },

    higlightByKeyEvent: function (e) {
      switch (e.which) {
        case 40:
          this.highlightNext(1);
          this.pauseFiltering();
          break;
        case 38:
          this.highlightNext(-1);
          this.pauseFiltering();
          break;
        default:
          this.enableFiltering();
          this.highlightExactMatch();
          return;
      }
      e.preventDefault();
      this.setInputValToHighlightedItem();
    },

    highlightExactMatch: function () {
      var self = this;
      setTimeout(function () {
        self.highlight(self.input.val());
      }, 10);
    },

    highlightNext: function (n) {
      var currentLi = this.highlightedLi(),
          nextLi;
      if (!currentLi) {
        nextLi = this.ul.find('li:not(.filtered)')[n < 0 ? 'last' : 'first']();
      } else {
        nextLi = currentLi[n < 0 ? 'prevAll' : 'nextAll']('li:not(.filtered)').first();
      }

      if (nextLi.length > 0) {
        this.highlight(nextLi);
        return true;
      }

      return false;
    },

    filter: function (value) {
      var currentHighlighted = this.highlightedLi(),
          currentWasFiltered = false,
          unfilteredCount = 0;

      if (this.pauseFilter) {
        return;
      }

      this.lis
        .addClass('filtered')
        .each(function () {
          var $this = $(this),
              item = $this.data('autocompleter-item');
          if (item.indexOf(value) >= 0) {
            $this.removeClass('filtered');
            unfilteredCount++;
          } else if (currentHighlighted && $this.get(0) == currentHighlighted.get(0)) {
            currentWasFiltered = true;
          }
        });

      if (currentWasFiltered) {
        if (!this.highlightNext(1)) {
          this.highlightNext(-1);
        }
      }

      if (unfilteredCount == 0) {
        this.ul.addClass('empty');
      } else {
        this.ul.removeClass('empty');
      }
    },

    open: function () {
      this.ul.addClass('active');
    },

    close: function (e) {
      this.ul.removeClass('active');
    }

  });

}(window.ko, window.jQuery));