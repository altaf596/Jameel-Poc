using System.Data.Entity.Validation;
using Microsoft.EntityFrameworkCore;
using Jameel.EntityFrameworkCore;

namespace Jameel.Core.Repositories
{

    public class Repository<T> : IRepository<T>, IDisposable where T : class
    {
        private DbSet<T> _entities;
        private string _errorMessage = string.Empty;

        public Repository(JameelDbContext context)
        {
            Context = context;
        }

        public JameelDbContext Context { get; set; }

        protected virtual DbSet<T> Entities
        {
            get { return _entities ?? (_entities = Context.Set<T>()); }
        }

        public void Dispose()
        {
            if (Context != null)
                Context.Dispose();

        }
        public virtual IEnumerable<T> GetAll()
        {
            return Entities.ToList();
        }
        public virtual void Insert(T entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("Entity");
                }


                Entities.Add(entity);
                Context.SaveChanges();

            }
            catch (DbEntityValidationException dbEx)
            {
                throw new Exception(_errorMessage, dbEx);
            }
        }

        public async Task<bool> Delete(int id)
        {

            try
            {
                var entity = await Entities.FindAsync(id);
                if (entity == null)
                {
                    return false;
                }

                Entities.Remove(entity);
                Context.SaveChanges();
                return true;

            }
            catch (DbEntityValidationException dbEx)
            {
                throw new Exception(_errorMessage, dbEx);
            }
             
           
        }

    }


}
