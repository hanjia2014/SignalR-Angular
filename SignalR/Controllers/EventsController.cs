using SignalR.Entities;
using SignalR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SignalR.Controllers
{
    public class EventsController : ApiController
    {
        private IRepository<Event> eventRepository;

        public EventsController()
        {
            this.eventRepository = new EventRepository(new BookingEntities());
        }
        public EventsController(IRepository<Event> repository)
        {
            eventRepository = repository;
        }
        // GET: api/Event
        public IEnumerable<Event> Get()
        {
            return eventRepository.Get();
        }

        // GET: api/Event/5
        public Event Get(Guid id)
        {
            return eventRepository.GetByID(id);
        }

        // POST: api/Event
        public void Post([FromBody] Event value)
        {
            eventRepository.Insert(value);
            eventRepository.Save();
        }

        // PUT: api/Event/5
        public void Put(Guid id, Event value)
        {
            eventRepository.Update(value);
            eventRepository.Save();
        }

        // DELETE: api/Event/5
        public void Delete(Guid id)
        {
            eventRepository.Delete(id);
            eventRepository.Save();
        }
    }
}
