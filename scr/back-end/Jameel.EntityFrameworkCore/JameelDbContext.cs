using Jameel.EntityFrameworkCore.Models;
using Microsoft.EntityFrameworkCore;

namespace Jameel.EntityFrameworkCore
{
    public class JameelDbContext : DbContext
    {
        public JameelDbContext(DbContextOptions<JameelDbContext> options)
           : base(options)
        {
        }

        DbSet<User> Users { get; set; }

    }
}
