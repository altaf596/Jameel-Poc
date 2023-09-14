This is a POC project which fulfills the following business needs:

Write a scheduled hang fire job to save user information after 5 min(configuarable with key: **AddUserDelayTimeInMinute** present in the appsettings.json) (User First Name, Last Name, Date of Birth, Phone Number, Address) into the database.
Details
Once the user fills in information and presses save, then the response should come as “Record Saved” but the record should save after 5 min because it should schedule a hangfire job.
Once the record is saved in the database, then SignalR should broadcast data and should be visible in the table front view.

Front End Angular
• User First Name, Last Name, Date of Birth, Phone Number, Address
• Table to view list of saved record using SignalR
• Use State Management

Back End Api
• Dot Net Core Api
• Hangfire job
• SignalR Hub

 Further, to run the project, make sure to prepare the environment and follow the required steps:

Environment:
.Net Core: v7
Angular CLI: 16.2.0
Node: 18.10.0
Package Manager: npm 8.19.2

Install Packages:
1. User MSSQL server connection info as per the environment and create both databases(JameelDb,JameelHangfireDb) which are mentioned on the appsettings.json
2. Update the db migration which will create a JameelDb database with its required tables.
3. Open the front-end Angular project and install all the npm packages.
