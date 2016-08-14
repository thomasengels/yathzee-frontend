"use strict";
/*
DASHBOARD-ENVIRONMENT-CONFIGRATION
constant value of backend api url
*/
 angular.module("dashboard-environment-configuration", [])

.constant("ENV", {
  "name": "development",
    //"api": "http://localhost:3001/api/"
    //"api": "http://10.99.10.113:3001/api/"
    "api": "http://localhost:3001/api"
});