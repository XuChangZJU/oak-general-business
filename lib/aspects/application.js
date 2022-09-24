"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
var application_dev_1 = require("./application.dev");
var application_prod_1 = require("./application.prod");
var getApplication = process.env.NODE_ENV === 'development' ? application_dev_1.getApplication : application_prod_1.getApplication;
exports.getApplication = getApplication;
