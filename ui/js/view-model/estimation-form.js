(function (actuary) {

  var PLANNING_POKER = [ 1, 2, 3, 5, 8, 13, 20, 40 ],
      DEFAULT_POINT_WEIGHT = 0.25,
      ESTIMATE = 'ESTIMATE',
      ACTUAL = 'ACTUAL';

  actuary.vm.EstimationForm = EstimationForm;

  /// - Estimation form --------------------------------------------------------

  function EstimationForm(_options) {
    var self = this,
        options = _.extend({ groups: [] }, _options);

    self.tab = ko.observable(ESTIMATE);

    self.groups = options.groups.map(function (group) {
      return new EstimationGroup(group);
    });

    self.grandTotal = new EstimationTotal(self.groups);
    self.grandTotal.initPokerPoints = ko.computed(function () {
      var points = self.grandTotal.initPoints(),
          len = PLANNING_POKER.length,
          i;
      if (!points) {
        return 0;
      }

      // TODO
    });

    self.hasNewFields = false;
    self.mergeNewFields = function () {
      window.confirm('Are you sure?');
    };

    self.toJson = ko.computed(function () {
      return {
        groups: self.groups.map(function (group) {
          return group.toJson();
        })
      };
    });
  }

  /// - Estimation Group -------------------------------------------------------

  function EstimationGroup(group) {
    var self = this;

    self.name = group.name;
    self.items = [];

    group.items.forEach(function (item) {
      self.items.push(new EstimationItem(item));
    });

    self.total = new EstimationTotal(self.items);

    self.toJson = ko.computed(function () {
      return {
        name  : self.name,
        items : self.items.map(function (item) { return item.toJson(); })
      };
    });
  }

  /// - Estimation item --------------------------------------------------------

  function EstimationItem(item) {
    var self = this;

    self.name = item.name;
    self.pointWeight = ko.observable(item.pointWeight || DEFAULT_POINT_WEIGHT);
    self.initRating = ko.observable(item.initRating || 0);
    self.postRating = ko.observable(item.postRating || 0);
    self.note = ko.observable(item.note);

    self.initPoints = ko.computed(function () {
      return self.initRating() * self.pointWeight();
    });
    self.postPoints = ko.computed(function () {
      return self.postRating() * self.pointWeight();
    });

    self.toJson = ko.computed(function () {
      return {
        name        : self.name,
        initRating  : self.initRating(),
        postRating  : self.postRating(),
        note        : self.note()
      };
    });
  }

  /// - Estimation Total -------------------------------------------------------

  function EstimationTotal(estimationItems) {
    function computeTotal(type) {
      return function () {
        return _.reduce(estimationItems, function (memo, item) {
          var itemValue = 0;
          if (item instanceof EstimationGroup) {
            itemValue = item.total[type]();
          } else {
            itemValue = item[type]();
          }
          return memo + itemValue;
        }, 0);
      };
    }
    
    this.initRating = ko.computed(computeTotal('initRating'));
    this.initPoints = ko.computed(computeTotal('initPoints'));
    this.postRating = ko.computed(computeTotal('postRating'));
    this.postPoints = ko.computed(computeTotal('postPoints'));
  }

}(window.actuary));