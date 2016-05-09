app.service('authInterceptor', ['$window', function($window) {
  function authInterceptor($window) {
    return {
      request: function(config) {
        var token = $window.localStorage.getItem('token');
        }
      }
    };
}])