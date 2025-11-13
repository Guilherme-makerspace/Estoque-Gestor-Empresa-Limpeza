nocd# TODO List for Codebase Improvements

- [x] Add dotenv dependency to package.json and install it
- [x] Create .env file with environment variables (DB credentials, session secret, login credentials)
- [x] Update server.js to load environment variables using dotenv
- [x] Fix database host in server.js from "0.0.0.0" to "localhost"
- [x] Add basic input validation for POST /produtos endpoint
- [x] Add basic input validation for PUT /estoque/entrada and /estoque/saida endpoints
- [x] Improve error handling in all endpoints with detailed responses and logging
- [x] Refactor login endpoint to use environment variables for credentials
- [x] Clean up code style in server.js (add missing semicolons, improve comments)
- [x] Test the API endpoints to ensure changes work correctly
