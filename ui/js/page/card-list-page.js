(function (actuary, ko) {

  window.addEventListener('DOMContentLoaded', function () {
    ko.applyBindings(new actuary.vm.CardListCreateForm(), 
        document.getElementById('card-list-create-form'));
  });

}(window.actuary, window.ko));