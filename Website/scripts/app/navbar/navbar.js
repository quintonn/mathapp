(function (app)
{
    'use strict';

    //navbarController.$inject = ['dialogService', 'userService', '$scope', 'httpService', 'menuService', 'fileService'];

    function navbarController()
    {
        var self = this;

        self.closeMenu = function ()
        {
            document.getElementsByClassName('menu-area')[0].style.display = 'none';
        }

        self.openMenu = function ()
        {
            document.getElementsByClassName('menu-area')[0].style.display = 'block';
        }
    }

    app.component('navbar', {
        templateUrl: function ()
        {
            return 'scripts/app/navbar/navbar.html?v=2';
        },
        controller: navbarController,
    });
})(angular.module('MathApp'));
