const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(
  path.join(__dirname, '../../logs/api-requests.log'),
  { flags: 'a' } // 'a' means append to file
);

const logger = (req, res, next) => {
  const startTime = new Date();
  const { method, url } = req;
  
  // Log when request finishes
  res.on('finish', () => {
    const duration = new Date() - startTime;
    const logEntry = {
      timestamp: startTime.toISOString(),
      method,
      url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers['user-agent'] || ''
    };
    
    // Write to console
    console.log(`[${logEntry.timestamp}] ${method} ${url} - ${res.statusCode} (${duration}ms)`);
    
    // Write to log file
    logStream.write(JSON.stringify(logEntry) + '\n');
  });
  
  next(); // Pass control to next middleware/route handler
};

module.exports = logger;