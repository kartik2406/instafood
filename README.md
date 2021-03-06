### Project Stack

Backend: Nodejs

Frontend: React

DB: Mongodb
The data from KML file is converted into GeoJson and stored into MongoDB

### Hosted URL

https://instafoods.herokuapp.com/

### Local setup

1. Server
   - cd server
   - npm install
   - npm start
2. Client
   - cd client
   - npm install
   - npm start

UI: http://localhost:3000/

API: http://localhost:4000/api/outlets?address=address

Adding the address in search box, and clicking on search will fetch the outlet name.

### Project features

- API that takes users location, get latitude and longitude from the same using third party API
  and returns and outlet name
- UI allows user to add location and search for nearby outlet
- Sample test cases verified.

### Known issues

- The third party API fails at times, wanted to switch to google API but was facing issues as it said I needed
  billed account.
