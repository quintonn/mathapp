(function (app)
{
    'use strict';

    function dialogService()
    {
        var service =
        {
            showMessageBox: showMessageBox,
            showConfirmation: showConfirmation,
            promptUserInput: promptUserInput,
            showInputDialog: showInputDialog
        };

        return service;
    }

    app.service('dialogService', dialogService);

})(angular.module(appConfig.appName));