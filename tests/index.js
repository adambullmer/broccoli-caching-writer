'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('expect.js');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var root = process.cwd();
var broccoli = require('broccoli');

var cachingWriter = require('..');

var builder;

describe('broccoli-caching-writer', function(){
  var sourcePath = 'tests/fixtures/sample-project/lib';

  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it('calls updateCache when there is no cache', function(){
    var updateCacheCalled = false;
    var tree = cachingWriter(sourcePath, {
      updateCache: function() {
        updateCacheCalled = true;
      }
    });

    builder = new broccoli.Builder(tree);
    return builder.build().then(function() {
      expect(updateCacheCalled).to.be.ok();
    });
  });

  //it('does not clobber the directory', function(){
  //  var sourcePath = 'tests/fixtures/sample-ember-style-package';
  //  var priorFilePath = path.join(root, exportLocation, 'random-stuff.txt');
  //  var contents   = 'random stuff';

  //  var tree = exportTree(sourcePath, {
  //    destDir: exportLocation,
  //    clobber: false
  //  });

  //  mkdirp.sync(exportLocation);
  //  fs.writeFileSync(priorFilePath, contents, {encoding: 'utf8'});

  //  builder = new broccoli.Builder(tree);
  //  return builder.build().then(function(dir) {
  //    var filePath = '/lib/main.js';
  //    var expected = fs.readFileSync(sourcePath + filePath);
  //    var actual   = fs.readFileSync(exportLocation + filePath);

  //    expect(actual).to.eql(expected);
  //    expect(fs.readFileSync(priorFilePath, {encoding: 'utf8'})).to.eql(contents);
  //  });
  //})
});
