## EXCHANGE WEBSERVICE
(there should be description of Exchange Webservice, and it should be so epic, that even Tolkien could be proud of it)

Build on NestJS.

#### HOW TO RUN IT?

Requirements:
- Docker
- Docker Compose

Copy .env.dist to .env and provide value for OXR_APP_ID (included in mail). Then run `make dev` to launch local environment.
First launch may take few minutes to automatic `npm install`. 
 
Makefile commands:
- `make dev` will start dev environment, and bind webservice to port 3001
- `make bash` will attach to node container, where you can run `nest` and `npm` commands
- `make build-prod` will build prod image
- `make run-prod` will build prod image and run it on port 3001
- `make tests` will execute both unit and e2e tests on application
- `make test-coverage` will show test coverage