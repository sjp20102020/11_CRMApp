/**
 * Each section of the site has its own module. It probably also has submodules,
 * though this boilerplate is too simple to demonstrate it. Within
 * `src/app/client`, however, could exist several additional folders
 * representing additional modules that would then be listed as dependencies of
 * this one. For example, a `note` section could have the submodules
 * `note.create`, `note.delete`, `note.edit`, etc.
 * 
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 * 
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular
		.module('ngBoilerplate.client', [ 'ui.router', 'base64' ])

		/**
		 * Each section or module of the site can also have its own routes.
		 * AngularJS will handle ensuring they are all available at run-time,
		 * but splitting it this way makes each module more "self-contained".
		 */
		.config(function config($stateProvider) {
			$stateProvider.state('client', {
				url : '/client',
				views : {
					"main" : {
						controller : 'ClientCtrl',
						templateUrl : 'client/client.tpl.html'
					}
				},
				data : {
					pageTitle : 'Client'
				}
			});
		})

		.factory(
				'clientService',
				function($http, $base64) {
					var session = {};
					session.client_submit = function(data) {
						return $http
								.post(
										"/BCSWeb/login",
										"firstName=" + data.firstName+ "&lastName=" + data.lastName,
										{
											headers : {
												'Content-Type' : 'application/x-www-form-urlencoded'
											}
										}).then(function(data) {
									alert("client save successful");
									localStorage.setItem("session", {});
								}, function(data) {
									alert("error client save");
								});
					};
					return session;
				})

		/**
		 * And of course we define a controller for our route.
		 */
		.controller('ClientCtrl',
				function ClientController($scope, sessionService) {
					$scope.isLoggedIn = sessionService.isLoggedIn;
					$scope.logout = sessionService.logout;

					$scope.client_submit = function() {
						console.log("I am in ClientCtrl-->client_submit"+$scope.myForm.firstName+","+ $scope.myForm.lastName);
					};

				});
