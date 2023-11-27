# Service Squirrel

Service Squirrel is a clone of the site TaskRabbit. This website provides connection with freelance workers that offer various household services.
Users can browse through the website and find household services that suit their needs, such as furniture installation, moving, gardening, etc.
After finding a service, they can make a booking and payment and will be accomodated with an available Tasker.
## Live Link

https://service-squirrel.onrender.com


## Technology Used
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)


## Wiki Links
[DB Schema](https://github.com/jzumbrunn21/Service_Squirrel/wiki/DB-Schema) | [Feature List](https://github.com/jzumbrunn21/Service_Squirrel/wiki/Feature-List) | [User Stories](https://github.com/jzumbrunn21/Service_Squirrel/wiki/User-Stories)


## Installation and setup

Clone the repository into a desired location and open the file in Visual Studio Code. Open a terminal and run ```pipenv install -r requirements.txt```
Open a new terminal and cd into the react-app folder and run ```npm install``` to download all dependencies for React.
Create a new database using the backend terminal, run ```flask db migrate``` ```flask db upgrade``` ```flask seed all```
After installing all backend and frontend dependencies and setting the database, run the command ```flask run``` in the backend terminal and run ```npm start``` in /react-app on a separate terminal.


## Features

### Services
ServiceSquirrel displays all available services and details of specific ones, also allows creation for new ones
![squirrel1](https://github.com/jzumbrunn21/Service_Squirrel/assets/126112107/ef2c6bd8-7131-407e-a25a-fc87713ea2e1)
### Service Detail
![squirrel2](https://github.com/jzumbrunn21/Service_Squirrel/assets/126112107/0c2c6f46-2969-48e5-a49f-f1de3c7398e1)
### Bookings
All the user's bookings can be viewed and there are several modal buttons for varied user options.
Multiple modals were decided here as the actions were brief as it needed little information for updates or simple confirmations for other actions.
Calendar type date selection was chosen  to make the date update U/I quicker and the most readable.
![squirrel3](https://github.com/jzumbrunn21/Service_Squirrel/assets/126112107/0c0f2fbf-ce58-4e58-9bce-a555c1004bbf)
![squirrel4](https://github.com/jzumbrunn21/Service_Squirrel/assets/126112107/77e825c5-5b66-44f6-82aa-b95abf099657)

### Booking, Billing, and Review Process
https://github.com/jzumbrunn21/Service_Squirrel/assets/126112107/d8f9c4e8-7fe7-42d9-9a70-cfdb7d3deb8b


## Contributers
### Fei Chen [LinkedIn](https://www.linkedin.com/in/fei-c-651612193/)
### Sofiia Kryvushko [LinkedIn](https://www.linkedin.com/in/sofiia-kryvushko/)
### Shawn Transmonte [LinkedIn](https://www.linkedin.com/in/shawn-trasmonte-116a22267/)
### Josh Zumbrunn [LinkedIn](https://www.linkedin.com/in/josh-zumbrunn-622622274)
 






