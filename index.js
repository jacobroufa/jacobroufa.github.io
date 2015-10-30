/**
 * Use this as a local test server
 * `npm start`
 */

'use strict';

var connect = require( 'connect' );
var serve = require( 'serve-static' );

connect().use( serve( __dirname )).listen( 8080 );
