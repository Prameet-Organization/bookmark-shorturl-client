# Bookmark and short url

By this application we can create shorturls and share them within teams.

## Software required:
  - Java 11
  - Node Js
  - Maven

## Modules: (latest in master)
    Backend: https://github.com/prameetpradhan/bookmark-shorturl-service
    Frontend: https://github.com/prameetpradhan/bookmark-shorturl-client
    
## Run modules
### Backend
    - Create github app for oauth2 authenticationa and put client id and secret in application.yml file
    - Please update below property with correct path of your system.
        spring:
    datasource:
        url: jdbc:h2:file:/home/prameet/testDb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=false
    - mvn clean install
    - java -jar target/bookmark-shorturl-service-0.0.1-SNAPSHOT.jar
    
### Frontend
    - npm install
    - ng serve
    
# How to use:
- launch application : http://localhost:4200
- Click on log in with github button
- There are 4 tabs
- Group: For creation of tribe and feature team
- Team: To add a user to a group (once user login to this app, they will get added into system and we can then add them to some group)
- Create Short Url: To create short urls
- Urls: To view urls

### Swagger url
http://localhost:8080/swagger-ui.html
