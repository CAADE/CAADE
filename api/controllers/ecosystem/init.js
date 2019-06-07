
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

  fn: async function (inputs, exits) {

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    try {
      let envs = await Environment.find().populateAll();
      let retval = {};
      _.each(envs, function(env) {
        let tenv = _.omit(env, ["id", "createdAt", "updatedAt", "compose", "portals"]);
        retval[tenv.name]= tenv;
      });
      return exits.json(retval);
      // return exits.json(retval);
    }
    catch (e) {
      return exits.error(e);
    }
  }
};

