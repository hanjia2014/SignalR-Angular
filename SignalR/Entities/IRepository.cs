using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Entities
{
    public interface IRepository<T> : IDisposable
    {
        IEnumerable<T> Get();
        T GetByID(Guid id);
        void Insert(T item);
        void Delete(Guid itemId);
        void Update(T item);
        void Save();
    }
}
