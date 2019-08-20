(function (app)
{
    'use strict';

    var err = 0;

    httpService.$inject = ['dialogService'];

    function httpService(dialogService)
    {
        var service =
        {
            get: get,
            getApi: getApi,
            post: post,
            postApi: postApi,
        };

        function get(url)
        {
            return sendItem(url, "GET");
        }

        function getApi(url)
        {
            return sendItem(appConfig.getSetting('apiUrl') + url);
        }

        function post(url, data)
        {
            return sendItem(url, "POST", data);
        }

        function postApi(url, data)
        {
            return sendItem(appConfig.getSetting('apiUrl') + url, "POST", data);
        }

        function sendItem(url, method, dataToSend)
        {
            if (dataToSend != null)
            {
                dataToSend = JSON.stringify(dataToSend);
            }

            return new Promise(function (res, rej)
            {
                var versionURL = appConfig.getSetting('rootUrl') + url;// + "?v=_" + appConfig.getSetting('version');

                var ajaxFail = function (jqXHR, textStatus, errorThrown)
                {
                    err++;
                    console.log(method + ' call to ' + versionURL + ' failed');
                    console.log(textStatus);
                    console.log(errorThrown);
                    console.log(JSON.stringify(jqXHR));
                    if (err > 5)
                    {
                        alert('error count exceeded');
                    }
                    else
                    {
                        handleRequestFailure(jqXHR, url, method, dataToSend).then(function (rsp)
                        {
                            res(rsp);
                        }).catch(function (err)
                        {
                            rej(err);
                        });
                    }
                }

                $.ajax({
                    method: method,
                    url: versionURL,
                    crossDomain: true,
                    data: dataToSend,
                    //beforeSend: function (xhr)
                    //{
                    //    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
                    //}
                })
                    .done(res)
                    .fail(ajaxFail);
            });
        }

        function handleRequestFailure(err, url, method, dataToSend)
        {
            return new Promise(function (res, rej)
            {
                if (err.status == 400)
                {
                    //TODO: do i show error here and resolve the problem and check the result when making a http request or do i reject here and 
                    //      catch the error on caller side????
                    console.error(err);
                    //dialogService.showMessage("Error", "Error", err.responseJSON.Message);
                    var errorMessage = err;
                    if (err && err.responseJSON && err.responseJSON.Message)
                    {
                        errorMessage = err.responseJSON.Message;
                    }
                    rej(errorMessage);
                }
                else if (err.status == 500)
                {
                    console.error(err);
                    //dialogService.showMessage("Error", "Error", err.responseJSON.Message);
                    errorMessage = err;
                    if (err && err.responseJSON && err.responseJSON.Message)
                    {
                        errorMessage = err.responseJSON.Message;
                    }
                    rej(errorMessage);
                }
                else
                {
                    console.log('Unexpected http failure: (' + err.status + ')');
                    rej(err);
                }
            });
        }

        return service;
    }

    app.service('httpService', httpService);

})(angular.module(appConfig.appName));