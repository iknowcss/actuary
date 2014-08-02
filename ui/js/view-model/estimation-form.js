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
    self.grandTotal.initPokerPoints = ko.computed(pokerPoints(self.grandTotal.initPoints));
    self.grandTotal.postPokerPoints = ko.computed(pokerPoints(self.grandTotal.postPoints));

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
    
    this.initRating = ko.computed(totalComputer(estimationItems, 'initRating'));
    this.initPoints = ko.computed(totalComputer(estimationItems, 'initPoints'));
    this.postRating = ko.computed(totalComputer(estimationItems, 'postRating'));
    this.postPoints = ko.computed(totalComputer(estimationItems, 'postPoints'));
  }

  /// - Util -------------------------------------------------------------------

  function totalComputer(estimationItems, type) {
    return function () {
      return _.reduce(estimationItems, function (memo, item) {
        var itemValue = 0;
        if (item instanceof EstimationGroup) {
          itemValue = ko.utils.unwrapObservable(item.total[type]);
        } else {
          itemValue = ko.utils.unwrapObservable(item[type]);
        }
        return memo + itemValue;
      }, 0);
    };
  }

  function pokerPoints(pointAccessor) {
    return function () {
      var points = ko.utils.unwrapObservable(pointAccessor),
          len = PLANNING_POKER.length,
          i;
      if (!points) {
        return 0;
      }
      for (i = 0; i < len; i++) {
        if (points <= PLANNING_POKER[i]) {
          return PLANNING_POKER[i];
        }
      }
      return PLANNING_POKER[len - 1];
    }
  }

}(window.actuary));