'use strict';

var app = angular.module('oAuth',['satellizer']);

app.config(function  ($authProvider) {
  $authProvider.github({
      clientId: '8ace517e33d79aa39144'
    });

  // $authProvider.oauth2({
  //     name: 'github',
  //     url: '/auth/github',
  //     clientId: '8ace517e33d79aa39144',
  //     redirectUri: window.location.origin,
  //     authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  //   });

});

app.controller('socialLogin', function  ($scope, $auth) {
  $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function  (res) {
        console.log(res);
      })
      .catch(function  (err) {
        console.log(err);
      });
    };
})