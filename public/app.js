angular.module('authExample', ['ui.router', 'ngCookies']);

angular.module('authExample')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('login', {
      url: '/',
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html',
      controller: 'mainCtrl'
    })
    $urlRouterProvider.otherwise('/');
});
