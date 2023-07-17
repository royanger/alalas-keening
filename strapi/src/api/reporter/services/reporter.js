'use strict';

/**
 * reporter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::reporter.reporter');
