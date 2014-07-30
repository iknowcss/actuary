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

      $(window).on('keydown', function (e) {
        // Ctrl+J and Cmd+J
        if ((e.ctrlKey || e.metaKey) && e.keyCode == 74) { 
          cardNumberInput.focus().val(cardNumberInput.val());
        }
      });
    }

  });

  function JumpForm(cardNumbers, initCardNumber) {
    this.existingCardNumbers = cardNumbers;
    this.cardNumber = ko.observable(initCardNumber).extend({ cardNumber: true });
  }

}(window.ko, window.jQuery));