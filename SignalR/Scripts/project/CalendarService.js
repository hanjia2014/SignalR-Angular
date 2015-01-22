calendarApp.factory("CalendarService", function ($http) {
    return ({
        getEvents: function () {
            return $http.get('http://localhost:60567/api/events');
        },
        addEvent: function (event) {
            return $http.post('/home/AddEvent', event);
        },
        deleteEvent: function (eventId) {
            return $http.delete('/home/DeleteEvent', { params: { id: eventId } });
        },
    });
});