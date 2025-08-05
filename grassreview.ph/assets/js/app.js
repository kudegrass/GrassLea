// Login & Settings Logic
const app = {
  user: null,

  // Login
  login: function() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username && password) {
      this.user = { username };
      localStorage.setItem("grassreview_user", username);
      alert(`Welcome, ${username}!`);
      window.location.href = "dashboard.html";
    } else {
      alert("Please enter both username and password.");
    }
  },

  // Logout
  logout: function() {
    localStorage.removeItem("grassreview_user");
    this.user = null;
    window.location.href = "index.html";
  },

  // Load User
  loadUser: function() {
    const username = localStorage.getItem("grassreview_user");
    if (username) {
      this.user = { username };
      document.getElementById("user-greeting") && 
        (document.getElementById("user-greeting").textContent = `Hi, ${username}!`);
    } else {
      if (window.location.pathname.includes("dashboard.html") ||
          window.location.pathname.includes("settings.html")) {
        alert("Please log in first.");
        window.location.href = "login.html";
      }
    }
  },

  // Save Settings
  saveSettings: function() {
    const showTips = document.getElementById("show-tips").checked;
    const difficulty = document.getElementById("difficulty").value;
    localStorage.setItem("grassreview_settings", JSON.stringify({ showTips, difficulty }));
    alert("Settings saved!");
  },

  // Load Settings
  loadSettings: function() {
    const saved = localStorage.getItem("grassreview_settings");
    if (saved) {
      const settings = JSON.parse(saved);
      if (document.getElementById("show-tips")) 
        document.getElementById("show-tips").checked = settings.showTips;
      if (document.getElementById("difficulty")) 
        document.getElementById("difficulty").value = settings.difficulty;
    }
  }
};

// Auto-load on page load
window.onload = function() {
  if (document.getElementById("login-form")) {
    // Login page
  } else if (document.getElementById("user-greeting") || 
             document.getElementById("settings-form")) {
    app.loadUser();
    app.loadSettings();
  }
};
