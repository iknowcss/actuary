(function (actuary, ko) {

  var indexOf = [].indexOf;

  window.addEventListener('DOMContentLoaded', function () {
    var options,
        estimationForm,
        userCardData,
        userCardId;
    
    userCardData = actuary.util.getScriptJson('#user-card-data');
    userCardId = userCardData['_id']['$id'];

    // Prepare the ViewModel
    estimationForm = new actuary.vm.EstimationForm({
      groups: userCardData.groups || actuary.EMPTY_ESTIMATION
    });

    // Apply view bindings
    ko.applyBindings(estimationForm, document.getElementById('estimation-form-page'));

    // Subscribe to changes of the form
    // Note: subscribe after binding so that init does not trigger a save
    estimationForm.toJson.subscribe(function (formData) {
      saveEstimationForm(userCardId, formData);
    });

  });

  function hasClassName(element, className) {
    return indexOf.call(element.classList, className) >= 0;
  }

  function saveEstimationForm(userCardId, formData) {
    formData.userCardId = userCardId;

    console.log('Send user card estimation to server', JSON.stringify(formData));
    $.ajax('./api/v1/user-card.php', {
      dataType  : 'json',
      type      : 'PUT',
      data      : JSON.stringify(formData)
    }).done(function () {
      console.log('Success');
    }).fail(function () {
      console.log('Request error!');
    });
  }

}(window.actuary, window.ko));