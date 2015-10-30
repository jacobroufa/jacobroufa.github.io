(function() {

  'use strict';

  var http = require( 'http' );
  var promise = require( 'q' );
  var marked = require( 'marked' );
  var moment = require( 'moment' );

  var resumeJSON = __dirname + '/../json/resume.json';
  var resume = {};

  var getHttp = function getHttp( url ) {
    var def = promise.defer();

    http.get( url, def.resolve );

    return def.promise;
  };

  getHttp( resumeJSON )
    .then( parseResume )
    .then( buildResume );

  function parseResume( res ) {

    console.log( res.end( resume ) );

    var work = res.body.work;
    var talks = res.body.talks;
    var skills = res.body.skills;
    var current = [];
    var past = [];

    work.map( formatWork );

    work = sortArray( work, 'end' );

    current = work.filter( getCurrentWork );

    past = work.filter( getPastWork );

    talks.map( formatTalks );

    resume.current = current;
    resume.talks = talks;
    resume.skills = skills;
    resume.past = past;

    console.log( resume );

  }

  function sortArray( arr, prop ) {
    return arr.sort( function( a, b ) {
      if ( a[prop] === 'present' ) {
        return -1;
      }

      return a[prop].isAfter( b[prop] ) ? -1 : 1;
    });
  }

  function formatWork( job ) {
    job.description = marked( job.description );
    job.end = job.end ? moment( job.end ) : 'present';
    job.start = moment( job.start );
  }

  function getCurrentWork( job ) {
    return job.end === 'present';
  }

  function getPastWork( job ) {
    return job.end !== 'present';
  }

  function formatTalks( talk ) {
    talk.description = marked( talk.description );
    talk.date = moment( talk.date );
  }

  function buildResume() {
    console.log( resume );
  }

})();
