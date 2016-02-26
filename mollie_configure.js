Template.configureLoginServiceDialogForoMollie.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});
Template.configureLoginServiceDialogForoMollie.fields = function () {
  return [
    {property: 'client_id', label: 'Client ID'},
    {property: 'secret', label: 'Client Secret'}
  ];
};