(function (app)
{
    'use strict';

    menuService.$inject = ['$location', 'dialogService', '$injector', '$rootScope'];

    function menuService($location, dialogService, $injector, $rootScope)
    {
        var menuProcessor;

        var service =
        {
            menuClick: menuClick,
            getMenu: getMenu,
            goBack: goBack,
            showView: showView
        };

        var navigationStack = [];
        var currentMenu = {};

        function debugMenuStack(action)
        {
            if (false)
            {
                console.log('****************');
                console.log(action);
                console.log(currentMenu.id);
                console.log('---');
                for (var i = 0; i < navigationStack.length; i++)
                {
                    console.log(navigationStack[i].id);
                }
                console.log('---');
                console.log('****************');
            }
        }

        function goBack()
        {
            debugMenuStack('BACK-1');
            navigationStack.pop();

            var menu = new menuItem('', 'home');
            if (navigationStack.length > 0)
            {
                menu = navigationStack[navigationStack.length - 1];
                currentMenu = menu;
            }
            debugMenuStack('BACK-2');
            menuClick(menu);
        }

        function showView(id, params)
        {
            menuClick({ id: id, params: params });
        }

        function handleUserNavigation(menu)
        {
            debugMenuStack('MENU-1');
            if (menu.id == "")
            {
                currentMenu = {};
                navigationStack = [];
            }
            else
            {
                if (currentMenu.id != menu.id)
                {
                    navigationStack.push(menu);
                    currentMenu = menu;
                }
            }
            debugMenuStack('MENU-1');
        }

        function gotoPath(path, params)
        {
            if (typeof params == 'undefined' || params == null)
            {
                params = {};
            }

            setTimeout(function ()
            {
                $rootScope.$apply(function ()
                {
                    $location.path(path).search(params);
                });
            }, 0); //timeout because of $apply
        }

        function menuClick(menu)
        {
            if (menu.id == "")
            {
                gotoPath("/");//$location.path("/").search({});
                handleUserNavigation(menu);
            }
            else
            {
                var actionProcessed = false;

                if (typeof menuProcessor != 'undefined' && menuProcessor.processUserAction)
                {
                    actionProcessed = menuProcessor.processUserAction(menu.id, menu.params);
                }

                if (actionProcessed == false)
                {
                    handleUserNavigation(menu);

                    if (typeof menu.params != 'undefined' && menu.params != null)
                    {
                        //$location.path("/view/" + menu.id).search(menu.params);
                        gotoPath('/view/' + menu.id, menu.params);
                    }
                    else
                    {
                        //$location.path("/view/" + menu.id).search({});
                        gotoPath('/view/' + menu.id);
                    }
                }
            }
        }

        function getMenu()
        {
            return webUtils.retrieveOrUseCache("APP_MENU", function () { return retrieveMenuContents(); });
        }

        function retrieveMenuContents()
        {
            if (typeof menuProcessor != 'undefined' && menuProcessor.retrieveMenu)
            {
                return menuProcessor.retrieveMenu();
            }
            else
            {
                return Promise.reject("Function 'retrieveMenu' not found on menuProcessService");
            }
        }

        function initialize()
        {
            try
            {
                menuProcessor = $injector.get('menuProcessService');
            }
            catch (error)
            {
                webUtils.log('Unable to resolve menu processor. This is required to continue', LogLevel.error);
                console.log(error);
                webUtils.log(error.message);
            }
        }

        initialize();

        return service;
    }

    app.service('menuService', menuService);

})(angular.module(appConfig.appName));