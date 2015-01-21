using SignalR.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalR.Controllers
{
    public class EventService
    {
        private IRepository<Event> eventRepository;

        public EventService()
        {
            this.eventRepository = new EventRepository(new BookingEntities());
        }
        public EventService(IRepository<Event> repository)
        {
            eventRepository = repository;
        }

        public bool DeleteEvent(int id)
        {
            try
            {
                eventRepository.Delete(id);
                eventRepository.Save();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}