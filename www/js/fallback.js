var APP_URL = 'https://rename.seraf1.fr';
var RETRY_DELAY_MS = 3000;
var MAX_RETRIES = 10;
var retries = 0;

function setStatus(title, hint, showSpinner) {
  document.getElementById('status-title').textContent = title;
  document.getElementById('status-hint').textContent = hint;
  var spinner = document.querySelector('.spinner');
  if (showSpinner) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}

function tryConnect() {
  fetch(APP_URL, { method: 'HEAD', cache: 'no-store', mode: 'no-cors' })
    .then(function () {
      window.location.href = APP_URL;
    })
    .catch(function () {
      retries++;
      if (retries >= MAX_RETRIES) {
        setStatus(
          'Connexion impossible',
          'Vérifiez votre connexion internet et relancez l\'application.',
          false
        );
        return;
      }
      setTimeout(tryConnect, RETRY_DELAY_MS);
    });
}

tryConnect();

if (window.Capacitor && window.Capacitor.isNativePlatform() && window.Capacitor.Plugins.App) {
  window.Capacitor.Plugins.App.addListener('backButton', function () {
    window.Capacitor.Plugins.App.exitApp();
  });
}
