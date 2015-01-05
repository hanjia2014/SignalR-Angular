using SignalR.Entities;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SignalR.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
        public Event Get(int id)
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
        public void Put(int id, Event value)
        {
            eventRepository.Update(value);
            eventRepository.Save();
        }

        // DELETE: api/Event/5
        public void Delete(int id)
        {
            eventRepository.Delete(id);
            eventRepository.Save();
        }
    }
}
