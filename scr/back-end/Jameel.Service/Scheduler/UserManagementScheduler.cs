using Hangfire;
using Jameel.Core.Repositories.Users;
using Jameel.EntityFrameworkCore.Models;
using Jameel.Service.RealTime;
using Jameel.Service.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jameel.Service.Scheduler
{
    public class UserManagementScheduler : IUserManagementScheduler
    {
        public readonly IHubContext<NotificationHub> _hubContext;
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        public UserManagementScheduler(IHubContext<NotificationHub> hubContext,
             IUserRepository userRepository,
             IConfiguration configuration)
        {
            _hubContext = hubContext;
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public void ScheduleToSaveUser(User user)
        {           
            BackgroundJob.Schedule(() => this.AddUserAndNotify(user), TimeSpan.FromMinutes(this._configuration.GetValue<int>("Hangfire:AddUserDelayTimeInMinute")) );
        }



        #region private methods

        public void AddUserAndNotify(User user)
        {
            _userRepository.Insert(user); 
            _hubContext.Clients.All.SendAsync("onUserAdded", user);
        }


        #endregion
    }
}
