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
      groups: userCardData.groups || [
        { name  : 'Front-end',
          items : [
            { name  : 'JSP' },
            { name  : 'JavaScript' },
            { name  : 'CSS' } ] },
        { name  : 'Middle',
          items : [
            { name  : 'Model' },
            { name  : 'Controller' },
            { name  : 'Service' },
            { name  : 'Repository' } ] },
        { name  : 'Database',
          items : [
            { name  : 'Schema' } ,
            { name  : 'Queries' } ] },
        { name  : 'Testing',
          items : [
            { name  : 'Step defs' },
            { name  : 'E2E' } ] },
        { name  : 'General',
          items : [
            { name  : 'Code smell' },
            { name  : 'Unknowns' } ] }
      ]
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
    var request = new XMLHttpRequest();
    request.open('PUT', './api/v1/user-card.php', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    formData.userCardId = userCardId;

    request.onload = function() {
      var responseData;
      if (request.status >= 200 && request.status < 400) {
        console.log('Success');
      } else {
        console.log('HTTP Error: ' + request.status);
      }
    };

    request.onerror = function() {
      console.log('Request error!');
    };

    console.log('Send user card estimation to server', JSON.stringify(formData));
    request.send(JSON.stringify(formData));
  }

}(window.actuary, window.ko));