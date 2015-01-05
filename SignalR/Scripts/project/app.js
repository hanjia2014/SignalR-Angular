var calendarApp = angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap']);

calendarApp.config(function ($provide) {
    $provide.decorator('$interval', function ($delegate) {
        var originalCancel = $delegate.cancel.bind($delegate);
        $delegate.cancel = function (intervalPromise) {
            var retValue = originalCancel(intervalPromise);
            if (retValue && intervalPromise) {
                intervalPromise.cancelled = true;
            }
            return retValue;
        };
        return $delegate;
    });
});