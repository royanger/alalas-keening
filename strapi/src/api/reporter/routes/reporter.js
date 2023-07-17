'use strict';

/**
 * reporter router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::reporter.reporter');
