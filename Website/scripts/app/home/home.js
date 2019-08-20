(function (app)
{
    'use strict';

    //homeController.$inject = ['dialogService', 'userService', '$scope', 'httpService', 'menuService', 'fileService'];

    function homeController()
    {
        var self = this;
    }

    app.component('home', {
        templateUrl: function ()
        {
            return 'scripts/app/home/home.html?v=4';
        },
        controller: homeController,
    });
    
})(angular.module('MathApp'));
