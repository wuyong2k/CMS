﻿var ArticleListController;

ArticleListController = [
  "$scope", "$routeParams", "$location", "Article", function($scope, $routeParams, $location, Article) {
    var _ref, _ref1, _ref2;
    $scope.$parent.showBanner = false;
    $scope.currentPage = (_ref = $routeParams.page) != null ? _ref : 1;
    $scope.category = $routeParams.type === 'category' ? $routeParams.query : '';
    $scope.tag = $routeParams.type === 'tag' ? $routeParams.query : '';
    $scope.date = $routeParams.type === 'date' ? $routeParams.query : '';
    $scope.key = (_ref1 = $routeParams.key) != null ? _ref1 : '';
    $scope.$parent.title = (_ref2 = $routeParams.group) != null ? _ref2 : $routeParams.channel;
    $scope.expand = function(item) {
      item.isShowDetail = !item.isShowDetail;
      return codeformat();
    };
    $scope.setPage = function(pageNo) {
      var filter;
      $scope.loading = true;
      filter = '1 eq 1';
      if ($routeParams.channel) {
        filter = "Group/Channel/Url eq '" + $routeParams.channel + "'";
      }
      if ($routeParams.group) filter = "Group/Url eq '" + $routeParams.group + "'";
      return Article.query({
        $filter: filter,
        $skip: (pageNo - 1) * 10,
        category: $scope.category,
        tag: $scope.tag,
        date: $scope.date,
        search: $scope.key
      }, function(data) {
        scroll(0, 0);
        $scope.list = data;
        return $scope.loading = false;
      });
    };
    return $scope.setPage(1);
  }
];