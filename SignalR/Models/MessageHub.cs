using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalR.Models
{
    public class ChatHub : Hub
    {
        public void SendMsg(string name, string message)
        {
            Clients.All.UpdateProduct(name, message);
        }

        public void AddEvent(Event aEvent)
        {
            Clients.All.UpdateEvents(aEvent);
        }

        public void RemoveEvent(int index)
        {
            Clients.All.RemoveEvent(index);
        }
    }
}