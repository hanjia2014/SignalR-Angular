function CalendarCtrl($scope, $http, $compile, CalendarService) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    // Proxy created on the fly
    var chat = $.connection.chatHub;

    // Declare a function on the chat hub so the server can invoke it
    chat.client.UpdateEvents = function (event) {
        $scope.$apply(function () {
            $scope.events.push({
                title: event.Title,
                start: new Date(event.Start),
                end: new Date(event.End)
            });
        });
    };

    function getDateTime(dateValue) {
        var value = '\/Date(0)\/';
        if (dateValue) {
            value = '\/Date(' + Date.parse(dateValue) + ')\/';
        }
        return value;
    };

    chat.client.RemoveEvent = function (index) {
        $scope.$apply(function () {
            $scope.events.splice(index, 1);
        });
    };

    // Start the connection
    $.connection.hub.start().done(function () {
        $("#add").click(function () {
            // Call the chat method on the server
            var data = { title: $scope.eventTitle == null || $scope.eventTitle == '' ? '[empty]' : $scope.eventTitle, start: getDateTime($scope.eventStart), end: getDateTime($scope.eventEnd), currentTimezone: 'local' };
            CalendarService.addEvent(data).success(function () {
                chat.server.addEvent(data);
            });
        });
    });

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event',           // an option!
        currentTimezone: 'local' // an option!
    };
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


    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        //var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        callback(events);
    };

    $scope.calEventsExt = {
        color: '#f00',
        textColor: 'yellow',
        events: [
           { type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
           { type: 'party', title: 'Lunch 2', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
           { type: 'party', title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
        ]
    };
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
            chat.server.removeEvent(index);
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
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}