app.config(appConfig).run(routeChange);

appConfig.$inject = ['$routeProvider', '$httpProvider'];
routeChange.$inject = ["$rootScope","$location", "$window", "authService"];



 function appConfig($routeProvider, $httpProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      restricted: true,
      preventLoggedIn: false
    })
    .when('/register',{
      templateUrl: 'templates/register.html',
      controller: 'registerController',
      restricted: false,
      preventLoggedIn: true
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'loginController',
      restricted: false,
      preventLoggedIn: true
    })
    .when('/edit', {
      templateUrl: 'templates/edit.html',
      controller: 'editMemberController',
      restricted: false,
      preventLoggedIn: true
    })
    .when('/logout', {
      restricted: false,
      preventLoggedIn: false,
      resolve: {
        test: function(authService, $rootScope, $location) {
          authService.logout();
          $rootScope.currentMember = authService.getMemberInfo();
          $location.path('/login');
        }
      }
    })
    .otherwise({redirectTo: '/login'});
    $httpProvider.interceptors.push('authInterceptor');
  }

  function routeChange($rootScope, $location, $window, authService){
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      // if route us restricted and no token is present
      if(next.restricted && !$window.localStorage.getItem('token')) {
        $location.path('/login');
      }
      // if password and prevent logging in is true
      if(next.preventLoggedIn && $window.localStorage.getItem('token')) {
        $location.path('/');
      }
    });
  }
  