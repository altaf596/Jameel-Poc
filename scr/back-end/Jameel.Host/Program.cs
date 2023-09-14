using Hangfire;
using Jameel.EntityFrameworkCore;
using Jameel.Host.Extensions;
using Jameel.Ioc;
using Jameel.Service.RealTime;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var _defaultCorsPolicyName = "default";

// Add services to the container.


var connectionString = builder.Configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("Connection string 'Default' not found.");
builder.Services.AddDbContext<JameelDbContext>(options =>
    options.UseSqlServer(connectionString));

//add all DI to the container
builder.Services.BootstrapAppService();

builder.Services.AddSignalR();

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Jameel API",
        Description = "This contains specific implimentations for Jameel Scheduler",
        TermsOfService = new Uri("https://jameelksa.com/privacy-policy/"),
        Contact = new OpenApiContact
        {
            Name = "Contact",
            Url = new Uri("https://jameelksa.com/contact/")
        },
        License = new OpenApiLicense
        {
            Name = "About",
            Url = new Uri("https://jameelksa.com/about/")
        }
    });
});


builder.Services.AddHangfire(x => x.UseSqlServerStorage(builder.Configuration.GetConnectionString("Hangfire")));
builder.Services.AddHangfireServer();

var allowedOrigines = builder.Configuration.GetValue<string>("AllowedCorsOrigins")
                                  .Split(",", StringSplitOptions.RemoveEmptyEntries)
                                  .Select(o => o.RemovePostFix("/"))
                                  .ToArray();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: _defaultCorsPolicyName, builder =>
    {
        builder.AllowAnyMethod()
               .AllowAnyHeader()
               .SetIsOriginAllowed(origin => origin.IsIn(allowedOrigines))
               .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(_defaultCorsPolicyName);

app.UseHttpsRedirection();

app.UseHangfireDashboard();

app.MapControllers();

app.MapHub<NotificationHub>("/NotificationHub");
 
app.UseSwagger();

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.Run();
