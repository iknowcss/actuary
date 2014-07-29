(function (actuary, ko) {

  window.addEventListener('DOMContentLoaded', function () {
    var existingCardNumbers,
        vm,
        form;

    document.getElementById('card-number').focus();

    existingCardNumbers = document.getElementById('existing-card-numbers');
    existingCardNumbers = JSON.parse(existingCardNumbers.innerHTML);

    vm = new actuary.vm.CardListCreateForm(existingCardNumbers);
    form = document.getElementById('card-list-create-form');
    ko.applyBindings(vm, form);

    vm.cardNumber.subscribe(function (newValue) {
      form.submit();
    }, null, 'autocomplete');
  });

}(window.actuary, window.ko));