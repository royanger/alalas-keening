'use strict';

/**
 * gm-note service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gm-note.gm-note');
