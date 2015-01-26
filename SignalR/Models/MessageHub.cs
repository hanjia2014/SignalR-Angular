using Microsoft.AspNet.SignalR;

namespace SignalR.Models
{
    public class EventHub : Hub
    {
        public void SendMsg(string name, string message)
        {
            Clients.All.UpdateProduct(name, message);
        }

        public void AddEvent(Event aEvent)
        {
            Clients.All.UpdateEvents(aEvent);
            Clients.Caller.UpdateEventsDone();
        }

        public void RemoveEvent(int index)
        {
            Clients.All.RemoveEvent(index);
        }
    }
}