using Jameel.Core.Repositories.Users;
using Jameel.Service.RealTime;
using Jameel.Service.Scheduler;
using Jameel.Service.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace Jameel.Ioc
{
    public static class BootstrapDependencyInjection
    {
        public static IServiceCollection BootstrapAppService(this IServiceCollection services)
        {
            services.AddReposotries();
            services.AddServices();
            services.AddSchedulerServices();

            return services;
        }
        
        private static IServiceCollection AddReposotries(this IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>();

            return services;
        }
        private static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();

            return services;
        }
        private static IServiceCollection AddSchedulerServices(this IServiceCollection services)
        {
            services.AddTransient<IUserManagementScheduler, UserManagementScheduler>();

            return services;
        }
    }
}
