function CalendarCtrl($scope, $http, $compile, CalendarService) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    // Proxy created on the fly
    var hub = $.connection.eventHub;

    // Declare a function on the chat hub so the server can invoke it
    hub.client.UpdateEvents = function (event) {
        $scope.$apply(function () {
            $scope.events.push({
                id: event.Id,
                title: event.Title,
                start: new Date(event.Start),
                end: new Date(event.End)
            });
        });
    };

    hub.client.UpdateEventsDone = function () {
        $scope.$apply(function() {
            $scope.updateMessage = "An event has been created";
        });
    }

    function getDateTime(dateValue) {
        var value = '\/Date(0)\/';
        if (dateValue) {
            value = '\/Date(' + Date.parse(dateValue) + ')\/';
        }
        return value;
    };

    hub.client.RemoveEvent = function (index) {
        $scope.$apply(function () {
            $scope.events.splice(index, 1);
        });
    };

    // Start the connection
    $.connection.hub.start().done(function () {
        $("#add").click(function () {
            // Call the chat method on the server
            var data = { title: $scope.eventTitle == null || $scope.eventTitle == '' ? '[empty]' : $scope.eventTitle, start: $scope.eventStart, end: $scope.eventEnd, currentTimezone: 'local' };
            CalendarService.addEvent(data).success(function (id) {
                data.Id = id;
                hub.server.addEvent(data);
            });
        });
    });

    /* event source that contains custom events on the scope */
    $scope.events = [];
    CalendarService.getEvents().success(function (data) {
        angular.forEach(data, function (event) {
            var title = event.Title;
            var start = event.Start;
            var end = event.End;
            var id = event.Id;
            $scope.events.push({
                id: id,
                title: title,
                start: new Date(start),
                end: new Date(end)
            });
        });
    }).
    error(function (data, status, headers, config) {
    });
    /* alert on eventClick */
    $scope.alertOnEventClick = function (event, allDay, jsEvent, view) {
        $scope.alertMessage = (event.title + ' was clicked ');
    };
    /* alert on Drop */
    $scope.alertOnDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function (sources, source) {
        var canAdd = 0;
        angular.forEach(sources, function (value, key) {
            if (sources[key] === source) {
                sources.splice(key, 1);
                canAdd = 1;
            }
        });
        if (canAdd === 0) {
            sources.push(source);
        }
    };

    /* remove event */
    $scope.remove = function (index, event) {
        CalendarService.deleteEvent(event.id).success(function () {
            hub.server.removeEvent(index);
        });
    };
    /* Change View */
    $scope.changeView = function (view, calendar) {
        calendar.fullCalendar('changeView', view);
    };
    /* Change View */
    $scope.renderCalender = function (calendar) {
        if (calendar) {
            calendar.fullCalendar('render');
        }
    };
    /* Render Tooltip */
    $scope.eventRender = function (event, element, view) {
        element.attr('tooltip', event.title);
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            header: {
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}