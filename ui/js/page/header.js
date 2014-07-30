(function (ko, $) {

  $(function () {
    var jumpForm = $('#jump-form'),
        vm,
        autocompleter,
        cardNumberInput,
        initCardNumber,
        existingCardNumbers;

    // TODO: refactor/componentize
    if (jumpForm.length > 0) {
      cardNumberInput = jumpForm.find('.jump-input');
      existingCardNumbers = actuary.util.getScriptJson('#existing-card-numbers');
      initCardNumber = cardNumberInput.val();
      vm = new JumpForm(existingCardNumbers, initCardNumber);
      ko.applyBindings(vm, jumpForm.get(0));

      cardNumberInput.data('autocompleter').dropdownClicked.subscribe(function (cardNumber) {
        jumpForm.submit();
      });

      actuary.kb.setShortcut('J', function () {
        cardNumberInput.focus();
      });

      cardNumberInput
        .on('blur', function () {
          vm.cardNumber(initCardNumber);
        })
        .on('focus', function () {
          vm.cardNumber(actuary.DEFAULT_CARD_NUMBER);
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