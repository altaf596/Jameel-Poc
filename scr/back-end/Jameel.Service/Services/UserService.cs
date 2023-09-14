using Jameel.Core.Repositories.Users;
using Jameel.EntityFrameworkCore.Models;
using Jameel.Service.Scheduler;
using Jameel.Service.Services.Dto;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jameel.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserManagementScheduler _userManagementScheduler;
        private readonly IUserRepository _userRepository;
        public UserService(IUserManagementScheduler userManagementScheduler,
            IUserRepository userRepository)
        {
            _userManagementScheduler = userManagementScheduler;
            _userRepository = userRepository;
        }

        public string AddUser(CreateUserInputDto input)
        {
            try
            {
                var user = new User();
                user.Address = input.Address;
                user.FirstName = input.FirstName;
                user.LastName = input.LastName;
                user.PhoneNumber = input.PhoneNumber;

                user.Dob = DateTime.ParseExact(input.Dob, "dd/MM/yyyy", CultureInfo.InvariantCulture);

                _userManagementScheduler.ScheduleToSaveUser(user);

                return "Record Saved";
            }
            catch (Exception)
            {
                throw;
            }

        }

        public string Delete(int userId)
        {

            try
            {
                var isSuccess = _userRepository.Delete(userId).Result;
                if (isSuccess)
                {
                    return "Deleted Successfully";
                }
                else
                {
                    throw new Exception("Please try again");
                }
            }
            catch (Exception)
            {
                throw;
            }
           
        }

        public List<User> GetAllUsers()
        {
            return _userRepository.GetAll().ToList();
        }
    }
}
