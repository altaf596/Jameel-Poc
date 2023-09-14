using Jameel.EntityFrameworkCore;
using Jameel.EntityFrameworkCore.Models;

namespace Jameel.Core.Repositories.Users
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(JameelDbContext context) : base(context)
        {
        }
    }
}
