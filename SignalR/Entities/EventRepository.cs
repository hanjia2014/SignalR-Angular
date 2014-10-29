using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SignalR.Entities
{
    public class EventRepository : IRepository<Event>, IDisposable
    {
        private BookingEntities context;
        public EventRepository(BookingEntities context)
        {
            this.context = context;
        }

        public IEnumerable<Event> Get()
        {
            return context.Events.ToList();
        }

        public Event GetByID(Guid id)
        {
            return context.Events.Find(id);
        }

        public void Insert(Event item)
        {
            if (item.Id == Guid.Empty)
                item.Id = Guid.NewGuid();
            context.Events.Add(item);
        }

        public void Delete(Guid itemId)
        {
            var item = context.Events.Find(itemId);
            context.Events.Remove(item);
        }

        public void Update(Event item)
        {
            context.Entry(item).State = EntityState.Modified;
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private bool disposed;
        protected void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }

            disposed = true;
        }
    }
}