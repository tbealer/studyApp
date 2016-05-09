app.service('authService', ['$window', '$http', function($window, $http) {

    var user = {};
    return {
      login: function(user) {
        return $http.post('/login', user);
      },
      logout: function(user) {
        user = null;
        $window.localStorage.clear();
      },
      register: function(user) {
        return $http.post('/register', user);
      },
      setUserInfo: function(userData) {
        $window.localStorage.setItem('user', JSON.stringify(userData.data.user));
        $window.localStorage.setItem('token', JSON.stringify(userData.data.token));
      },
      getUserInfo: function(user) {
        return $window.localStorage.getItem('user');
      },
    };
  }]);