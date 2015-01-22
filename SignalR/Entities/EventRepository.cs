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

        public EventRepository()
        {
            context = new BookingEntities();
        }

        public EventRepository(BookingEntities context)
        {
            this.context = context;
        }

        public IEnumerable<Event> Get()
        {
            return context.Events.ToList();
        }

        public Event GetByID(int id)
        {
            return context.Events.Find(id);
        }

        public void Insert(Event item)
        {
            item.Id = NextId;
            context.Events.Add(item);
            context.SaveChanges();
        }

        public void Delete(int itemId)
        {
            var item = context.Events.Find(itemId);
            context.Events.Remove(item);
            context.SaveChanges();
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

        private int NextId
        {
            get
            {
                return context.Events == null ? 1 : context.Events.ToList().Max(e => e.Id) + 1;
            }
        }
    }
}