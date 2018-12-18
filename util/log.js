const { format, createLogger, transports } = require('winston');

const { combine, label, printf } = format;

const myFormat = printf(info => `[${info.label}] ${info.level}: \n${info.message}`);

module.exports = name => createLogger({
  format: combine(label({ label: name }), myFormat),
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
});
