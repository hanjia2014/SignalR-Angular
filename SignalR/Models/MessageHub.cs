using Microsoft.AspNet.SignalR;

namespace SignalR.Models
{
    public class EventHub : Hub
    {
        public void SendMsg(string name, string message)
        {
            //push content to connected clients
            Clients.All.UpdateMessage(name, message);
        }

        public void AddEvent(Event aEvent)
        {
            Clients.All.UpdateEvents(aEvent);
            //send to specific client : 'all clients except the caller'
            Clients.Others.UpdateEventsDone();
        }

        public void RemoveEvent(int index)
        {
            Clients.All.RemoveEvent(index);
        }
    }
}