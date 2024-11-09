class HealthController {
    check(req, res) {
      res.json({
        status: 'API is running',
        timestamp: new Date(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      });
    }
  }
  
  module.exports = new HealthController();
  