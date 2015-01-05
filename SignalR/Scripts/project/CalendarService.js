calendarApp.factory("CalendarService", function ($http) {
    return ({
        getEvents: function () {
            return $http.get('http://localhost:60567/api/events');
        },
        addEvent: function (event) {
            return $http.post('http://localhost:60567/api/events', event);
        },
        deleteEvent: function (eventId) {
            return $http.delete('http://localhost:60567/api/events', { params: { id: eventId } });
        },
    });
});