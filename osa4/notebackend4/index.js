const app = require("./app"); // Express app
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.Port, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
