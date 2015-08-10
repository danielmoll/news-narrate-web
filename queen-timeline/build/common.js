#!/usr/bin/env node
module.exports = function (name) {
    'use strict';

    global._ = require('lodash');
    global.async = require('async');
    global.fs = require('fs-extra');
    global.glob = require('glob');
};