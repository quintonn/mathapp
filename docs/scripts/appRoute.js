(function (app)
{
    'use strict';

    app.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider)
    {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            '**']);

        $routeProvider.when("/",
            {
                template: function ()
                {
                    return "<home></home>";
                },
                //resolve:
                //{
                //    xx: ['$rootScope', 'menuService', 'userService', function ($rootScope, menuService, userService)
                //    {
                //        verifyAuthenticated(menuService, userService);
                //        $rootScope.$emit('changeHeading', "home");
                //        webUtils.toggleClassInSet('home', 'not-on-home-page', 'on-home-page');
                //    }]
                //}
            });
    }]);

})(angular.module("MathApp", ['ngRoute']));