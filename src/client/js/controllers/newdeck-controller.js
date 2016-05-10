
    app.controller('newdeckController', [function newdeckController($scope, authService){


      $scope.currentMember = authService.getMemberInfo();
  

}]);