const exec = require('child_process').exec;
const taction = require('../../api/controllers/portal/rm');

describe('portal rm Script Test Cases', function () {
  describe('Primary portal rm Test Case', function () {
    it('Primary portal rm Good Path', function (done) {
      // var command = exec('bash -c ls -latr', {shell: 'C:\\Users\\dwpulsip\\tools\\Git\\bash.exe'}, function (err, stdout, stderr) {
      let command = "bin/caade-portal-rm ";
      let params = [];
      _.each(Object.keys(taction.inputs), function (key) {
        if(key !== "mode") {
          params.push("--" + key + " " + taction.inputs[key].type);
        }
      });
      command += params.join(" ");
      let results = exec(command, function (err, stdout, stderr) {
        console.log(stderr);
        if (err) {
          return done(err);
        }
        else {
          console.log(stdout);
        }
      });
      results.on('exit', function (code) {
        return done(code);
      });
    });
  });
});
