(function (actuary) {

  var PLANNING_POKER = [ 1, 2, 3, 5, 8, 13, 20, 40 ],
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
    self.storyPoints = new EstimationPoints(self.grandTotal);

    self.toJson = ko.computed(EstimationForm.prototype.toJson, this);
  }

  EstimationForm.prototype.toJson = function () {
    return {
      groups: this.groups.map(function (group) { return group.toJson(); })
    };
  };

  /// - Estimation Group -------------------------------------------------------

  function EstimationGroup(group) {
    this.name = group.name;
    this.items = [];
    group.items.forEach(function (item) {
      this.items.push(new EstimationItem(item));
    }, this);
    this.total = new EstimationTotal(this.items);
    this.points = new EstimationPoints(this.total);

    this.toJson = ko.computed(EstimationGroup.prototype.toJson, this);
  }

  EstimationGroup.prototype.toJson = function () {
    return {
      name  : this.name,
      items : this.items.map(function (item) { return item.toJson(); })
    };
  };

  /// - Estimation item --------------------------------------------------------

  function EstimationItem(item) {
    this.name = item.name;
    this.initRating = ko.observable(item.initRating || 0);
    this.postRating = ko.observable(item.postRating || 0);
    this.note = ko.observable(item.note);

    this.toJson = ko.computed(EstimationItem.prototype.toJson, this);
  }

  EstimationItem.prototype.toJson = function () {
    return {
      name        : this.name,
      initRating  : this.initRating(),
      postRating  : this.postRating(),
      note        : this.note()
    };
  };

  /// - Estimation Total -------------------------------------------------------

  function EstimationTotal(estimationItems) {
    this.initTotal = ko.computed(function () {
      return _.reduce(estimationItems, function (memo, item) {
        var itemValue = 0;
        if (item instanceof EstimationGroup) {
          itemValue = item.total.initTotal();
        } else {
          itemValue = item.initRating();
        }
        return memo + itemValue;
      }, 0);
    });
    this.postTotal = ko.computed(function () {
      return _.reduce(estimationItems, function (memo, item) {
        var itemValue = 0;
        if (item instanceof EstimationGroup) {
          itemValue = item.total.postTotal();
        } else {
          itemValue = item.postRating();
        }
        return memo + itemValue;
      }, 0);
    });
  }

  /// - Estimation points ------------------------------------------------------

  function EstimationPoints(estimationTotal) {
    var self = this;

    self.initRawPoints = ko.computed(function () {
      return estimationTotal.initTotal() / 4;
    });

    self.initPoints = ko.computed(function () {
      var rawPoints = self.initRawPoints(),
          len = PLANNING_POKER.length,
          i;
      if (rawPoints === 0) {
        return '-'
      }
      for (i = 0; i < len; i++) {
        if (rawPoints <= PLANNING_POKER[i]) {
          return PLANNING_POKER[i];
        }
      }
    });

    self.postRawPoints = ko.computed(function () {
      return estimationTotal.postTotal() / 4;
    });

    self.postPoints = ko.computed(function () {
      var rawPoints = self.postRawPoints(),
          len = PLANNING_POKER.length,
          i;
      if (rawPoints === 0) {
        return '-'
      }
      for (i = 0; i < len; i++) {
        if (rawPoints <= PLANNING_POKER[i]) {
          return PLANNING_POKER[i];
        }
      }
    });
  }

}(window.actuary));