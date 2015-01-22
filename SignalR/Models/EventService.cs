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

        public int AddEvent(Event item)
        {
            item.Id = eventRepository.Get().Count() + 1;
            eventRepository.Insert(item);

            return item.Id;
        }

        public bool DeleteEvent(int id)
        {
            try
            {
                eventRepository.Delete(id);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}