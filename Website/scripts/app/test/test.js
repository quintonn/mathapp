(function (app)
{
    'use strict';

    //testController.$inject = ['dialogService', 'userService', '$scope', 'httpService', 'menuService', 'fileService'];

    function testController()
    {
        var self = this;
    }

    app.component('test', {
        templateUrl: function ()
        {
            return 'scripts/app/test/test.html?v=1';
        },
        controller: testController,
        //bindings:
        //{
        //    parameters: "<",
        //    closeDialog: "&",
        //}
    });
    
})(angular.module('MathApp'));
