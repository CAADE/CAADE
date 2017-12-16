const request = require("supertest-as-promised");
const taction = require('../../api/controllers/portal/rm');

describe('Controller portal  Test Cases', function () {
  describe('Primary Controller portal rm Test Case', function () {
    // Requires an environment and stack be created first.
    it('Primary Controller portal rm Good Path', function (done) {
      let url = "/portal/rm?";
      let params = [];
      _.each(Object.keys(taction.inputs), function (key) {
        if (key != "mode") {
          params.push(key + "=" + taction.inputs[key].type);
        }
        else {
          params.push("mode=json");
        }
      });
      url += params.join("&");
      request(sails.hooks.http.app)
        .get(url)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          else {
            console.log(res.body);
            done();
          }
        });
    });
  });
});
