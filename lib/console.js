module.exports = function (settings) {

  const stackTrace = require('stack-trace');
  const util = require('util');

  settings = settings || {};

  const filenameMaxLength = settings.filenameMaxLength || 60;
  const enabled = settings.hasOwnProperty('enabled') ? settings.enabled : true;
  const silent = settings.hasOwnProperty('silent') ? settings.silent : false;

  const stringifyObjects = function (args) {
    args = Array.from(args);
    args.forEach(function (item, index) {
      if (typeof item === 'object' && typeof item !== null) {
        var cache = [];
        args[index] = JSON.stringify(item, function (key, value) {
          if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;
        }, '  ');
        cache = null;
      }
    });
    return args;
  };

  const customOutput = function (funcName, argsList, textColorCodeOpen, highlightColorCode) {
    if((silent && silent === true) || (Array.isArray(silent) && silent.indexOf(funcName) !== -1)) {
      return;
    }

    const colorCodeClose = '\x1b[0m';
    const trace = stackTrace.get();

    const lineCol = `${trace[2].getLineNumber()}:${trace[2].getColumnNumber()}`;
    let filename = trace[2].getFileName();
    if (filename.length > filenameMaxLength) {
      filename = `...${filename.substring(filename.length - filenameMaxLength, filename.length)}`
    }

    let output;
    if(Array.isArray(argsList) || typeof argsList === 'object') {
      output = `${stringifyObjects(argsList)}`;
    }
    else {
      output = argsList;
    }

    if (highlightColorCode) {
      output += ` ${highlightColorCode}${filename} ${lineCol}${colorCodeClose}${textColorCodeOpen}`;
    }
    else {
      output += ` ${filename} ${lineCol}`;
    }

    process.stdout.write(`${textColorCodeOpen}${output} ${colorCodeClose}\n`);
  };

  console.log = function () {
    customOutput('log', arguments, '\x1b[32m');
  };
  console.info = function () {
    customOutput('info', arguments, '\x1b[34m');
  };
  console.error = function () {
    customOutput('error', arguments, '\x1b[31m', '\x1b[7m');
  };
  console.warn = function () {
    customOutput('warn', arguments, '\x1b[33m');
  };
  console.dir = function () {
    customOutput('dir', arguments, '\x1b[36m');
  };
  console.memory = function(type = 'rss') {
    const mem = process.memoryUsage();
    const human_readable = `${type}: ${(mem[type] / (1024*1024)).toFixed(2)}MB`;
    customOutput('memory', human_readable, '\x1b[35m');
  }

};