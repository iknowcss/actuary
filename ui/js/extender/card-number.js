(function (ko) {

  ko.extenders.cardNumber = function (target) {
    var result = ko.computed({
      read: target,
      write: function (newValue) {
        var formattedValue;
        if (Object.prototype.toString.call(newValue) != '[object String]') {
          target('');
        } else {
          formattedValue = newValue.toUpperCase();
          target(formattedValue);
        }
      }
    }).extend({ notify: 'always' });

    result(target());

    return result;
  };

}(window.ko));