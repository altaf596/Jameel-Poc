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
