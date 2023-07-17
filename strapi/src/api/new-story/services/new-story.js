'use strict';

/**
 * new-story service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-story.new-story');
