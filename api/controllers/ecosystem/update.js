module.exports = {

  friendlyName: 'ecosystem update',

  description: ' Add description ',

  inputs: {
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
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'redirect'
    }
  },

  fn: async function (inputs, exits) {
    // Parse each compose file.
    // Find the services and the ports that are exposed. Look for ports ####:####.
    // Take the first #### as the port that exposed to the host as the portal port.
    try {
      let envs = env.req.body.environments;
      _.each(Object.keys(envs), async function (key) {
        let attr = _.omit(envs[key], ["portals"]);
        attr.name = key;
        let menv = await Environment.findOrCreate({name: key}, attr);
        let portals = getPortalsInfo(envs[key].compose.services);

        _.each(Object.keys(portals), async function(pkey) {
          pattr = portals[pkey];
          pattr.name = pkey;
          pattr.env = menv.id;
          pattr.port = parseInt(portals[pkey].port);
          await Portal.findOrCreate({name: pkey, env: menv.id}, pattr);
        });
        console.log(menv);
      });
      return exits.json("");
    }
    catch (e) {
      return exits.error(e);
    }
  }
};

function getPortalsInfo(services) {
  let retval = {};
  _.each(Object.keys(services), function(key) {
    if(services[key].ports) {
      if(services[key].ports.length > 0) {
        let port = services[key].ports[0];
        let labels = key || services[key].labels.join(" ");
        port = port.split(":");
        if(port.length > 1) {
          retval[key] = {description: labels, port: port[0]};
        }
      }
    }
  });
  return retval;
};

