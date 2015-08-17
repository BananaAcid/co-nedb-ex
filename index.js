'use strict';

/**
 * Module dependencies.
 */

var extend = require('extend')
  , thunkify = require('thunkify');

/**
 * Methods to wrap.
 */

var methods = [
  'update',
  'remove',
  'count',
  'find',
  'findOne',
  'insert',
  'ensureIndex',
  'removeIndex'
];

/**
 * Wrap `db`. preserve supplied object - but use the same instances behind it
 *
 * @param {Datastore} db
 * @return {Datastore}
 * @api public
 */

module.exports = function(dbIn) {
   // shallow copy
  var db = extend({}, dbIn);

  methods.forEach(function(method) {
    db[method] = thunkify(dbIn[method]);
  });

  return db;
};