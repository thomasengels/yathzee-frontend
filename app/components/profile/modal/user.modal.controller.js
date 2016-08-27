angular.module('myApp').controller('userModalController', ['modalService','user', userModalController]);

function userModalController(modalService, user) {
    var dvm = this

    dvm.user = user;
};