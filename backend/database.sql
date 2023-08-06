
CREATE DATABASE webinar
    DEFAULT CHARACTER SET = 'utf8mb4';

USE webinar;

DROP TABLE schedule;

CREATE TABLE schedule(  
    Date VARCHAR(11),
    Destination VARCHAR(3), 
    JsonData VARCHAR(2000) 
);

INSERT INTO schedule(Date, Destination, JsonData) VALUES
('15-06-2023', 'IN',
'{"Time": "15:00","Title": "Managing your Issues/Bugs effectively", "Speaker": "Afreen Banu T", "Designation": "Technical Support Engineer", "Description": "This webinar takes you through the Issue Tracker module of Zoho Projects. Learn how to leverage its advanced features to manage your bugs effectively."}');

INSERT INTO schedule(Date, Time, Title, Speaker, Designation, Description, Destination) VALUES
('20-06-2023', 'IN',
'"Time": "15:00", "Title": "Getting Started with Zoho Projects", "Speaker": "Afreen Banu T", "Designation": "Technical Support Engineer", "Description": "In this webinar, you will get to know the basics like creating a project, adding users, planning the to-dos, uploading documents, logging hours against the to-dos, collaborating with the team members, and tracking the project progress through various reports."' );

INSERT INTO schedule(Date, Time, Title, Speaker, Designation, Description, Destination) VALUES
('21-06-2023', 'IN',
'"Time": "15:00", "Title": "Hybrid Project Management with Zoho Sprints", "Speaker": "Esther Florence", "Designation": "Technical Support Engineer", "Description": "In this webinar, we will take you through the benefits of a hybrid project management solution and how this can be implemented with the Zoho Projects - Zoho Sprints integration."' );

INSERT INTO schedule(Date, Time, Title, Speaker, Designation, Description, Destination) VALUES
('22-06-2023', 'IN',
'"Time": "15:00", "Title": "Project Automation with Zoho Projects", "Speaker": "Maria Ignatious", "Designation": "Lead - Customer Support", "Description": "Join our product experts in this webinar to learn how you can automate status updates, mail alerts, notifications, and ensure smooth transition between workflow stages in a project."' );

INSERT INTO schedule(Date, Time, Title, Speaker, Designation, Description, Destination) VALUES
('27-06-2023', 'IN',
'"Time": "15:00", "Title": "Task Automation - Blueprint", "Speaker": "Harshini Dara", "Designation": "Lead - Customer Support", "Description": "Join this webinar to learn how to automate task processes completely, from task updates and reminders, to email alerts and notifications to third-party applications. Work smarter with automation, and get more done in less time."' );

INSERT INTO schedule(Date, Time, Title, Speaker, Designation, Description, Destination) VALUES
('28-06-2023', 'IN',
'"Time": "15:00", "Title": "Task Automation - Workflow Rules and Macro Rules", "Speaker": "Harshini Dara", "Designation": "Lead - Customer Support", "Description": "Make automation even powerful through Workflow and Macro Rules. In this webinar you will learn how to accommodate your unique business needs while automating tasks. Get as precise and detailed as needed with Zoho Projects."' );

INSERT INTO schedule(Date, Time, Title, Speaker, Designation, Description, Destination) VALUES
('29-06-2023', 'IN',
'"Time": "15:00", "Title": "Custom Functions in Zoho Projects", "Speaker": "Saraswathi S", "Designation": "Technical Support Engineer", "Description": "Join this webinar to learn how to make the most of automation by writing your own unique custom functions. In addition to default functions, build your own automation rules and associate the same with Blueprint or Workflow rules."' );

INSERT INTO schedule(Date, Time, Title, Speaker, Designation, Description, Destination) VALUES
('02-07-2023', 'IN',
'"Time": "14:00", "Title": "Advanced Zoho Projects Analytics", "Speaker": "Aravind M", "Designation": "Presales Engineer", "Description": "This webinar will show you how to set up the Zoho Projects advanced analytics connector, explain some of the important pre-packed reports that come with the connector, teach you how to create your own reports and dashboards, and how to share them with your colleagues."' );

DELETE FROM schedule WHERE Date!="15-06-2023";
DELETE FROM schedule WHERE Destination="N/A";

SELECT * from schedule;

SELECT * from schedule WHERE Date>='14-06-2023';

SELECT * FROM schedule WHERE Date > '14-06-2023';

SELECT * FROM schedule WHERE STR_TO_DATE(Date, '%d-%m-%Y') >= STR_TO_DATE('14-06-2023', '%d-%m-%Y');


INSERT INTO schedule SET 
{'Date': '15-06-2023',
'Time': '16:00' ,
'Title': 'User Management in Zoho Sprints', 
'Speaker': 'Maria John',
'Designation':'Customer Support'
};

SET @jsonData = '{"Date": "15-06-2023", "Time": "16:00", "Title": "User Management in Zoho Sprints", "Speaker": "Maria John", "Designation": "Customer Support"}';

INSERT INTO schedule (Date, Time, Title, Speaker, Designation)
VALUES (
  JSON_UNQUOTE(JSON_EXTRACT(@jsonData, '$.Date')),
  JSON_UNQUOTE(JSON_EXTRACT(@jsonData, '$.Time')),
  JSON_UNQUOTE(JSON_EXTRACT(@jsonData, '$.Title')),
  JSON_UNQUOTE(JSON_EXTRACT(@jsonData, '$.Speaker')),
  JSON_UNQUOTE(JSON_EXTRACT(@jsonData, '$.Designation'))
);

ALTER TABLE schedule
MODIFY COLUMN Description VARCHAR(500);

insert into schedule (date, time)
values('15-06-2023', '15:00');

