
module.exports = {

  friendlyName: 'ecosystem init',

  description: ' Initialize the ecosystem by returning a config file for the environment',

  inputs: {
  },

  exits: {
    json: {
      responseType: '', // with return json
    },
  },

  fn: async function (inputs, exits, env) {

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    try {
      let envs = await Environment.find().populateAll();
      let retval = {};
      _.each(envs, function(env) {
        let tenv = _.omit(env, ["id", "createdAt", "updatedAt"]);
        let portals = {};
        _.each(env.portals, function(portal) {
          portals[portal.name]= {description:portal.description, port:portal.port};
        });
        tenv.portals = portals;
        retval[tenv.name] = JSON.stringify(tenv);
      });
      let retstring = '{ "environments":\n  {';
      _.each(Object.keys(retval), function(key) { retstring += '    "' + key + '":' + retval[key]; });
      retstring += "  }\n}";

      return exits.json(retstring);
      // return exits.json(retval);
    }
    catch (e) {
      return exits.error(e);
    }
  }
};

