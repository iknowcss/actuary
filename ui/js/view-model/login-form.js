(function (actuary, ko) {

  actuary.vm.LoginForm = LoginForm;

  function LoginForm() {
    var self = this;

    self.user = ko.observable('');

    self.isValidUser = ko.computed(function () {
      return self.user().length > 0;
    });
  }

}(window.actuary, window.ko));