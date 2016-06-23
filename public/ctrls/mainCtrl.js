angular.module('authExample').controller('mainCtrl', function($scope, $state, loginService, $cookies) {

  $scope.user = $cookies.getObject('user');
  console.log("user in ctrl", $scope.user)

  if (!$scope.user) {
    $state.go('login');
    alert("Please log in");
  }

  $scope.logout = function() {
    $scope.user = {};
    loginService.logout()
      .then(function() {
        console.log($scope.user)
        alert("User Logged Out")
        $state.go('login')
      })
  }


});
