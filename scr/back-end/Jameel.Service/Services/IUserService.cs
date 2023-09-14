using Jameel.EntityFrameworkCore.Models;
using Jameel.Service.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jameel.Service.Services
{
    public interface IUserService
    {
        string AddUser(CreateUserInputDto userDto);
        List<User> GetAllUsers();
        string Delete(int userId);
    }
}
