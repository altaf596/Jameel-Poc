This is a POC project which fulfills the following business needs!

Write a scheduled hang fire job to save user information after 5 min (User First Name, Last Name, Date of Birth, Phone Number, Address) into database.
Details
Once user fill information and press save, then the response should come as “Record Saved” but the record should save after 5 min because it should schedule hangfire job.
Once the record is saved in the database, then SignalR should broadcast data and should be visible in table front view.

Front End Angular
•	User First Name, Last Name, Date of Birth, Phone Number, Address
•	Table to view list of saved record using SignalR
•	Use State Management

Back End Api
•	Dot Net Core Api
•	Hangfire job
•	SignalR Hub


Running Project: 

1. User MSSQL server connection info as per the environment and crate both database(**JameelDb**,**JameelHangfireDb**) which are mentioned on the appsettings.json
2. Update the db migration which will create **JameelDb** database with it's required tables.
3. Open front-end Angular project and install all the npm packages.
4. Now it's ready to run, First run the API and the run the UI.



.Net Environemtn:
  .Net Core 7

Agular Environment:

  Angular CLI: 16.2.0
  Node: 18.10.0
  Package Manager: npm 8.19.2
  OS: win32 x64
  
  Angular:
  ...
  
  Package                      Version
  ------------------------------------------------------
  @angular-devkit/architect    0.1602.0 (cli-only)
  @angular-devkit/core         16.2.0 (cli-only)
  @angular-devkit/schematics   16.2.0 (cli-only)
  @schematics/angular          16.2.0 (cli-only)
