
module.exports = {

  friendlyName: 'portal create',

  description: ' Add description ',

  inputs: {
    name: {
      description: 'The name of the portal',
      type: 'string',
      required: true
    },
    description: {
      description: 'Description of the portal',
      type: 'string',
      required: false
    },
    url: {
      description: 'URL of the web interface',
      type: 'string',
      required: true
    },
    rest: {
      description: 'URL of the rest interface',
      type: 'string',
      required: false
    },
    image: {
      description: 'image or logo of the portal',
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
      responseType: 'redirect',
    },
    failed: {
      responseType: 'view',
      viewTemplatePath: 'portal/failed'
    },
    json: {
      responseType: '', // with return json
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'redirect'
    }
  },

  fn: async function (inputs, exits, env) {

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    try {
      let portal = await Portal.findOne({name:inputs.name});
      if(portal) {
        if(inputs.mode == "json") {
            return exits.json({error: inputs.name + " already exists"});
        }
        else {
          return exits.failed({error: inputs.name + " already exists"});
        }
      }
      let descritpion = inputs.description || inputs.name;
      let rest = inputs.rest || inputs.url;

      portal = await Portal.create({
          name:inputs.name,
          description:description,
          url:inputs.url,
          rest:rest,
          image:inputs.image
      });
      // Display the results
      if(inputs.mode === "json") {
        // Return json
        return exits.json({name: user.name});
      }
      else {
        // Display the welcome view.
        return exits.success("portal/list");
      }
    }
    catch (e) {
      return exits.error(e);
    }
  }
};

