'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngMaterial','dashboard-environment-configuration','pusher-angular','ngAnimate','ngAria','ui.router','underscore','ngFileUpload','ui.bootstrap'])
    
    .config(['$mdThemingProvider','$stateProvider', '$urlRouterProvider','$mdIconProvider',
    function($mdThemingProvider, $stateProvider, $urlRouterProvider, $mdIconProvider){
             
        $mdIconProvider
           .defaultIconSet('assets/libs/bower_components', 24);    
        
        $urlRouterProvider.otherwise('error');
        
        $stateProvider 
        .state('login', {
            url: '/login',
            templateUrl: 'app/components/login/login.view.html',
            controller: 'loginController',
            conrollerAs: 'vm'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/components/register/register.view.html',
            controller: 'registerController',
            conrollerAs: 'vm'
        })
        .state('home', {
             url: '/home',
            templateUrl: 'app/components/profile/profile.view.html',
            controller: 'profileController',
            conrollerAs: 'vm'
        })
        .state('newgame', {
            url:'/newgame',
            templateUrl:'app/components/game/chosePlayers.view.html',
            controller:'newGameController',
            controllerAs: 'vm'
        })
        .state('startgame', {
            url: '/game/:gameId',
            templateUrl:'app/components/game/game.view.html',
            controller:'gameController'
        })
        .state('error', {
            url:'/error',
            templateUrl:'app/shared/error.view.html'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('amber');
    }
]);
