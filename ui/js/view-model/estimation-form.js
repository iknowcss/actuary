(function (actuary) {

  var PLANNING_POKER = [ 1, 2, 3, 5, 8, 13, 20, 40 ],
      DEFAULT_POINT_WEIGHT = 25,
      POINT_DIVISOR = 100,
      ESTIMATE = 'ESTIMATE',
      ACTUAL = 'ACTUAL';

  actuary.vm.EstimationForm = EstimationForm;

  /// - Estimation form --------------------------------------------------------

  function EstimationForm(_options) {
    var self = this,
        options = _.extend({ groups: [] }, _options);

    self.tab = ko.observable(ESTIMATE);

    self.groups = _.map(options.groups, function (group, id) {
      return new EstimationGroup(group, id);
    });

    self.grandTotal = new EstimationTotal(self.groups);
    self.grandTotal.initPokerPoints = ko.computed(pokerPoints(self.grandTotal.initPoints));
    self.grandTotal.postPokerPoints = ko.computed(pokerPoints(self.grandTotal.postPoints));

    self.toJson = ko.computed(function () {
      return {
        groups: mapJsonById(self.groups)
      };
    });
  }

  /// - Estimation Group -------------------------------------------------------

  function EstimationGroup(group, groupId, pointWeightMap) {
    var self = this,
        groupPointWeightMap;

    if (pointWeightMap && pointWeightMap.hasOwnProperty(groupId)) {
      groupPointWeightMap = pointWeightMap[groupId];
    } else {
      groupPointWeightMap = {};
    }

    self.id = groupId;
    self.name = group.name;
    self.ordinal = group.ordinal;
    self.items = [];

    _.each(group.items, function (item, itemId) {
      var pointWeight = groupPointWeightMap[itemId] || DEFAULT_POINT_WEIGHT;
      self.items.push(new EstimationItem(item, itemId, pointWeight));
    });

    self.total = new EstimationTotal(self.items);

    self.toJson = ko.computed(function () {
      return {
        name    : self.name,
        ordinal : self.ordinal,
        items   : mapJsonById(self.items)
      };
    });
  }

  /// - Estimation item --------------------------------------------------------

  function EstimationItem(item, id, pointWeight) {
    var self = this;

    self.id = id;
    self.name = item.name;
    self.pointWeight = pointWeight;
    self.initRating = ko.observable(item.initRating || 0);
    self.postRating = ko.observable(item.postRating || 0);
    self.note = ko.observable(item.note);

    self.initPoints = ko.computed(function () {
      return self.initRating() * self.pointWeight / POINT_DIVISOR;
    });

    self.postPoints = ko.computed(function () {
      return self.postRating() * self.pointWeight / POINT_DIVISOR;
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

  function mapJsonById(items) {
    var map = {};
    items.forEach(function (item) {
      map[item.id] = item.toJson();
    });
    return map;
  }

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