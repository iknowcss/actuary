(function (actuary, ko) {

  var DEFAULT_CARD_NUMBER = 'ECO-',
      VALID_CARD_NUMBER_REGEX = /^[A-Z]+-\d+$/;

  actuary.vm.CardListCreateForm = CardListCreateForm;

  function CardListCreateForm(existingCardNumbers) {
    var self = this;

    self.cardNumber = ko.observable(DEFAULT_CARD_NUMBER)
        .extend({ cardNumber: true });
    self.existingCardNumbers = existingCardNumbers;

    self.isValidCardNumber = ko.computed(function () {
      return VALID_CARD_NUMBER_REGEX.test(self.cardNumber());
    });

    self.resetCardNumber = function () {
      self.cardNumber(DEFAULT_CARD_NUMBER);
    };
  }

}(window.actuary, window.ko));