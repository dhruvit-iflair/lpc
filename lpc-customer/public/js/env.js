(function (window) {
    window.env_var = window.env_var || {};
  
    // API url
    window.env_var.apiUrl = 'http://192.168.1.50:7576/lpc';
    window.env_var.bizApiUrl = 'http://192.168.1.50:7575';
    // Base url
    window.env_var.baseUrl = '/';
  
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.env_var.enableDebug = true;
}(this));