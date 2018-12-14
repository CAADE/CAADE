# Build Stack Environment for CAADE

This is the build stack for CAADE. It starts a registry, jenkins server and agent, portainer server.

To start the stack on a docker swarm you must do the following.

* Create the following directories

```
# mkdir /mnt/jenkins
# mkdir /mnt/portainer
# mkdir /mnt/registry

```

* Update the jenkins-secret.txt with the jenkins username and password.
```
-master http://build:8000 -password admin -username admin -retry 100
```

* Generate keys for registry security

An RSA key is needed for the local Docker Registry. This can be done with OpenSSL.
The docker-compose.yaml file for the deployment of CAADE stores in volumes that are monunted
into the containter. The domain.key and domain.cert files should be accessible.

## Generating the openssl certs.

So we need to generate the key and cert in a ./registry_certs directory in the same path of where you run the stack
deploy command. so you will need to create a directory named registry_certs and then run the openssl command.

```

    # mkdir registry_certs
    # openssl req -newkey rsa:4096 -nodes -sha256 -keyout registry_certs/domain.key \
     -x509 -days 356 -out registry_certs/domain.cert
    Generating a 4096 bit RSA private key
    .......................++
    ...............................................................................................................................................++
    writing new private key to 'registry_certs/domain.key'
    -----
    You are about to be asked to enter information that will be incorporated
    into your certificate request.
    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:US
    State or Province Name (full name) [Some-State]: CA
    Locality Name (eg, city) []:
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:
    Organizational Unit Name (eg, section) []:
    Common Name (e.g. server FQDN or YOUR name) []: <registry server>
    Email Address []:
```
Now that the keys are created and put into a directory that the docker compose file references and put into the secrets
docker will now know where to find the keys and certs to launch a secure private repository. Make sure that you access
the registry through the same name specified in the key generation <registry server>. Ideally this would be a common name
that all clients can access through exposure of the ports through the docker stack deploy. Such as the docker swarm node
machine.

