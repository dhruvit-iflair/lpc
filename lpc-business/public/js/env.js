(function (window) {
    window.env_var = window.env_var || {};
  
    // API url
    window.env_var.apiUrl = 'http://146.185.138.139:7575';
    window.env_var.custApiUrl = 'http://146.185.138.139:7576/lpc';
    // Base url
    window.env_var.baseUrl = '/';
  
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.env_var.enableDebug = true;
}(this));