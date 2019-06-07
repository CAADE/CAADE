module.exports = {

  friendlyName: 'env create',

  description: ' Add description ',

  inputs: {
    name: {
      description: 'Long name of the environment',
      type: 'string',
      required: true
    },
    abbv: {
      description: 'Short name for the environment',
      type: 'string',
      required: true
    },
    url: {
      description: 'URL of the Swarm master',
      type: 'string',
      required: true
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
      viewTemplatePath: 'welcome'
    },
    json: {
      responseType: '', // with return json
    },
    error: {
      description: 'Error Creating Environment',
      responseType: '',
      statusCode: 400

    },
    duplicate: {
      description: 'Duplicate Environment not allowed!',
      responseType: '',
      statusCode: 409

    }
  },

  fn: async function (inputs, exits) {

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    try {
      let env = await Environment.find({name: inputs.name});
      if (env.length > 0) {
        console.error("Environment duplicate:", env);
        return exits.duplicate(inputs);
      }
      env = await Environment.create({name: inputs.name, abbv: inputs.abbv, url: inputs.url}).fetch();
      if (!env) {
        console.error("Environment not created!");
        return exits.error("Environment not created!");
      }
      if(inputs.mode === "json") {
        return exits.json({env:env});
      }
      return exits.success(env);
    }
    catch (e) {
      return exits.error(e);
    }
  }
};

