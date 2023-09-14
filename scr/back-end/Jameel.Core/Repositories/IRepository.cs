using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Jameel.Core.Repositories
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        void Insert(T obj);
        Task<bool> Delete(int id);

    }
}
