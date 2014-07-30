(function (actuary, ko) {

  actuary.vm.CardListCreateForm = CardListCreateForm;

  function CardListCreateForm(existingCardNumbers) {
    var self = this;

    self.cardNumber = ko.observable(actuary.DEFAULT_CARD_NUMBER).extend({ cardNumber: true });
    self.existingCardNumbers = existingCardNumbers;

    self.isValidCardNumber = ko.computed(function () {
      return actuary.VALID_CARD_NUMBER_REGEX.test(self.cardNumber());
    });

    self.resetCardNumber = function () {
      self.cardNumber(actuary.DEFAULT_CARD_NUMBER);
    };
  }

}(window.actuary, window.ko));