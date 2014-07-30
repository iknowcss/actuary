(function (ko, $) {

  $(function () {
    var jumpForm = $('#jump-form'),
        cardNumberInput,
        initCardNumber,
        existingCardNumbers;

    // TODO: refactor/componentize
    if (jumpForm.length > 0) {
      cardNumberInput = jumpForm.find('.jump-input');
      existingCardNumbers = actuary.util.getScriptJson('#existing-card-numbers');
      initCardNumber = cardNumberInput.val();
      ko.applyBindings(new JumpForm(existingCardNumbers, initCardNumber), jumpForm.get(0));
      cardNumberInput.data('autocompleter').dropdownClicked.subscribe(function (cardNumber) {
        jumpForm.submit();
      });

      actuary.kb.setShortcut('J', function () {
        cardNumberInput.focus().val(cardNumberInput.val());
      });
    }

  });

  function JumpForm(cardNumbers, initCardNumber) {
    this.existingCardNumbers = cardNumbers;
    this.cardNumber = ko.observable(initCardNumber).extend({ cardNumber: true });

    this.isValidCardNumber = ko.computed(function () {
      return actuary.VALID_CARD_NUMBER_REGEX.test(this.cardNumber());
    }, this);
  }

}(window.ko, window.jQuery));