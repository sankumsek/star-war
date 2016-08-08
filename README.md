# interview-app-shell
Basic Express based app for serving up a React based application

Start server via "npm start"
Running server can be accessed via localhost:3000

Work goes in the /client folder. Everything required in here is transpiled down from ES6/ES7 to standard ES5 using webpack and babel.

API is located at localhost:3000/api/incoming which serves up a json file. For response shape reference /server/mockData/incoming.json

# Notes

Used MUI for the datepicker interface. The errors that appear in the console are due known issues with the framework (not related to application). 
