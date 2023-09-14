using Jameel.EntityFrameworkCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jameel.Service.Scheduler
{
    public interface IUserManagementScheduler
    {
        void ScheduleToSaveUser(User user);
    }
}
