angular.module("authExample").controller("loginCtrl", function($scope, $state, loginService, $cookies) {



  $scope.createUser = function() {
    if ($scope.userInfo.password === $scope.userInfo.passwordTwo) {
      loginService.createUser($scope.userInfo)
        .then(function(res) {
          swal("Created New User", "You are now logged in.", "success")
          $state.go('main');
        });
    } else {
      alert("Passwords Do Not Match", "Please check to be sure your passwords match.")
    }
  };

  $scope.loginUser = function(login) {
    loginService.loginUser(login)
      .then(function(res) {
        $scope.login = null;
        $scope.user = $cookies.getObject('user');
        $state.go('main');
      });
  };


});
