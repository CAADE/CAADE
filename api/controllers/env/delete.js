module.exports = {

  friendlyName: 'env delete',

  description: ' Add description ',

  inputs: {
    name: {
      description: 'The name of the environment to delete',
      type: 'string',
      required: false
    },
    mode: {
      description: "results format: json or html",
      type: 'string',
      required: false
    }
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath:
                'welcome'
    },
    json: {
      responseType: '', // with return json
    },
    notFound: {
      description: 'No environment with the specified ID or name was found in the database.',
      responseType: 'redirect'
    }
  },

  fn: async function (inputs, exits) {

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    try {
      console.log("INPUTS:", inputs);
      if (inputs.name) {
        await Environment.destroy({name: inputs.name});
      }
      else {
        return exits.notFound(inputs);
      }
      // Display the results
      if (inputs.mode === "json") {
        // Return json
        return exits.json({status: "complete"});
      }
      else {
        // Display the welcome view.
        return exits.success({status: "complete"});
      }
    }
    catch (e) {
      return exits.error(e);
    }
  }
};

