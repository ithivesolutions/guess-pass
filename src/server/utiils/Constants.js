/**
 * API general messages
 * @type {{partialSuccess: string}}
 */
const messages = {
  partialSuccess: "Database operations were partially successful.",
  testMessage: "Code executed in test environment.",
  rtNoChange: "No records to update in Resource Tracker",
  dbPoolDebug: "Database connection pool statistics: ",
};

/**
 * API error messages
 * @type {{sqlInjection: string, databaseError: string, accessDenied: string, invalidDataSubmission: string, dbNoRowsFound: string}}
 */
const errorMessages = {
  databaseError:
    "Database error occurred. Please contact your system administrator",
  invalidDataSubmission: "Invalid data, please check your request.",
  accessDenied: "Access denied.",
  dbNoRowsFound: "Database query returned no results!",
  sqlInjection: "SQL injection attempt detected",
};

module.exports = {
  messages,
  errorMessages
};
