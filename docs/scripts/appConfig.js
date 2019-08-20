(function ()
{
    svg4everybody();
    angular.module("MathApp", ['ngRoute']);

    setTimeout(function ()
    {
        var div = document.getElementById('mainApp');
        
        angular.bootstrap(div, ["MathApp"], { strictDi: true, debugInfoEnabled: true });
    }, 10);
})();