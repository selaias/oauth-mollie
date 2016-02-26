Mollie = {};

// Request Mollie credentials for the user
//
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Mollie.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'mollie'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();

  var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
  var display = mobile ? 'touch' : 'popup';

  var scope = "profiles.read organizations.read";

  if (options && options.requestPermissions)
    scope = options.requestPermissions.join(' ');

  var loginStyle = OAuth._loginStyle('mollie', config, options);

  var loginUrl =
        'https://www.mollie.com/oauth2/authorize?client_id=' + config.client_id +
        '&redirect_uri=' + OAuth._redirectUri('mollie', config) +
        '&display=' + display + '&scope=' + scope +
        '&response_type=code' +
        '&approval_prompt=auto' +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken);

  OAuth.launchLogin({
    loginService: "mollie",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
};
