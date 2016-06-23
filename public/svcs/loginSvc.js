angular.module("authExample")
  .service('loginService', function($http, $state, $cookies) {


    this.loginUser = function(userInfo) {
      return $http({
        method: 'POST',
        url: '/api/login',
        data: {
          username: userInfo.username,
          password: userInfo.password,
        }
      }).then(function(res) {
        if (res.status === 200) {
          var user = res.data;
          $cookies.putObject('user', user);
          $state.go('main');
        }
      }, function(err) {
        alert("Login Failed. Your password or username was incorrect. If you do not have an account, please sign up.")
        res.send(err);
      });
    };



    this.logout = function() {
      return $http({
        method: 'GET',
        url: '/api/logout'
      }).then(function(res) {
        $cookies.remove('user');
        return res;
      });
    };

  });
