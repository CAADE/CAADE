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

    fn: async function (inputs, exits, env) {

        // Look up the user whose ID was specified in the request.
        // Note that we don't have to validate that `userId` is a number;
        // the machine runner does this for us and returns `badRequest`
        // if validation fails.
        try {
            let envs = env.req.body.environments;
            _.each(Object.keys(envs), async function (key) {
                let attr = _.omit(envs[key], ["portals"]);
                attr.name = key;
                let menv = await Environment.findOrCreate({name: key}, attr);

                _.each(Object.keys(envs[key].portals), async function(pkey) {
                    pattr = envs[key].portals[pkey];
                    pattr.name = pkey;
                    pattr.env = menv.id;
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

