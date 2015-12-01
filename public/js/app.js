'use strict';

var app = angular.module('oAuth',['satellizer','ui.router']);

app.config(function  ($authProvider,$stateProvider, $urlRouterProvider) {

  // Autorization 
  $authProvider.github({
    clientId: '8ace517e33d79aa39144'
  });
  $authProvider.facebook({
    clientId: '183859175293951'
  });
  $authProvider.google({
    clientId: '1061174881136-7fo54p7ivcd5ispk95hbc699q9r60d13.apps.googleusercontent.com'
  });


  //Routers
  $stateProvider
  .state('login', {
    url: "/",
  })
  .state('about',{
    url:'/about',
    templateUrl:'../partials/about.html'
  })
  .state('profile',{
    url:'/profile',
    templateUrl:'../partials/user.html'
  })
  .state('chatroom',{
    url:'/chatroom',
    templateUrl:'../partials/chats.html',
    controller: 'profileCtrl'
  })
  .state('conroom',{
    url:'/coolkidspool',
    templateUrl:'../partials/conroom.html'
  })

});

app.controller('socialLogin', function  ($scope, $auth,$state,$http, $location) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function  (res) {
      $state.go('chatroom');
    })
    .catch(function  (err) {
      console.log(err);
    });
  };
});

app.controller('profileCtrl', function($rootScope, $scope, $auth, $state, $http) {
  if(!$auth.isAuthenticated()){
    return $state.go('/');
  }
  $state.go('chatroom');
  $http.get('/chatroom')
  .then(function(res) {
    $scope.users = res.data;
  }, function(err) {
    console.error(err);
  });


  $scope.startChat = function  (user) {
    var peopleTalking = {};
    peopleTalking.currentUser = localStorage.satellizer_token;
    peopleTalking.clickedUser = user;

    $http.post('threads/newThread', peopleTalking).then(function  (data) {
      $scope.userChat = data;

      $state.go('conroom');
    })
  }

});


app.controller('navCtrl', function($rootScope ,$scope, $auth, $state, $location) {
  $scope.isAuthenticated = function(){
    return $auth.isAuthenticated();
  };
  $scope.logout = function() {
    $auth.logout();
    $state.go('login');
  };

});

app.controller('messageHandler', function  ($scope, $http) {
  var peopleTalking = {};
  peopleTalking.currentUser = localStorage.satellizer_token;
  peopleTalking = JSON.stringify(peopleTalking); //uh yeah now it works wtf
 $http.post('/coolpool', peopleTalking).then(function  (data) {
  
   $scope.threadId = data.data
   console.log($scope.threadId);
 });

 $scope.sendMessage = function  (message) {
  
  console.log(message);
}
});


