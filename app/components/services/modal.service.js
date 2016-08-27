/*
MODALSERVICE
construct confirm and modal dialog
*/
(function () {
    angular.module('myApp').factory('modalService', modalService);

    modalService.$inject = ['$mdDialog','$mdMedia'];

    function modalService($mdDialog,$mdMedia) {
        var customDialog =  function (controller, template, locals, targetevent) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
            return $mdDialog.show({
                controller: controller,
                controllerAs: 'dvm',
                templateUrl: template,
                parent: angular.element(document.body),
                targetEvent: targetevent,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: locals
            });
        };

        var confirmDialog = function(title, message, okBtnMessage, otherBtnMessage){
            var confirm = $mdDialog.confirm()
            .title(title)
            .content(message)
            .ariaLabel(title)
            .ok(okBtnMessage)
            .cancel(otherBtnMessage)
            .theme('default')
            .clickOutsideToClose(true);

            return $mdDialog.show(confirm);
        };

        return {
            customDialog:customDialog,
            confirmDialog:confirmDialog
        };
    }
})();
