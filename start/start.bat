@ECHO OFF

cd c:\Program Files\MongoDB\Server\4.2\bin\
start cmd /min /k mongod.exe
ECHO Database Started

cd C:\Users\jnarayan\ICS4U Workspaces\Contact List\api\
start cmd /min /k nodemon server
ECHO Nodemon Server Started

cd C:\Users\jnarayan\ICS4U Workspaces\Contact List\
start cmd /min /k npm run serve
ECHO Client Started