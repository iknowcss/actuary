(function (actuary, ko) {

  window.addEventListener('DOMContentLoaded', function () {
    var existingCardNumbers,
        vm,
        form,
        cardNumberInput;

    existingCardNumbers = actuary.util.getScriptJson('#existing-card-numbers');

    vm = new actuary.vm.CardListCreateForm(existingCardNumbers);
    form = document.getElementById('card-list-create-form');
    ko.applyBindings(vm, form);
    
    cardNumberInput = $('#card-number');
    cardNumberInput.data('autocompleter').dropdownClicked.subscribe(function (cardNumber) {
      form.submit();
    });
    cardNumberInput.focus();
  });

}(window.actuary, window.ko));