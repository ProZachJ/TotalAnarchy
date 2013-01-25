chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('app.html', {
    width: 500,
    height: 600,
    type: 'shell'
  });
});