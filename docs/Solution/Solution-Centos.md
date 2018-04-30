# Architectural Overview

_Description_

## [Users](Actors)

* _Actor_

## High level Use Cases

* _UseCases_

![Image](./UseCases/UseCases.png)

## Logical Architecture

_Description_

![Image](./Solution/Logical.png)

_Systems_

## Process Architecture

![Image](./Solution/Process.png)

## Deployment model

_Description_

![Image](./Solution/Deployment.png)

## Physical Architecture

_Description_

![Image](./Solution/Physical.png)

_Systems_

## Deployment_
This is a Reference Architecture for the CAADE solution using Salt, Docker, Jenkins, and Gluster
### Salt Stack
#### Install Salt Master on Node 0
```
node0# sudo yum install https://repo.saltstack.com/yum/redhat/salt-repo-latest-2.el7.noarch.rpm
node0# sudo yum install salt-api
node0# sudo yum install salt-master
node0# sudo yum install salt-minion
```
Now that you have salt installed on node0 (master node).
Go to the master configuration file /etc/salt/master and add these lines.
```
file_roots:
   base:
     - /srv/salt/

pillar_roots:
  base:
    - /srv/pillar
```
There should be several things that are in the /etc/salt/master file commented out.

Get the fingerprint of the master node
```
node0# sudo salt-key -f master.pub
```
Save this string it will be used in the configuration of the minions.

#### Install Salt Minion on Node[0-4]
```
node1# sudo apt-get install salt-minion
```
Now edit the /etc/salt/minion file to contain the following
```
master: node0
master_finger: "Put output of 'alt-key -f master.pub' here"
```
#### Get things running
On node0 start the salt master as root in the foreground
```
node0# sudo salt-master 
```
or in the background
```
node0# sudo salt-master -d
```

On node[0-4] start the salt-minions
```
node1# sudo salt-minion
```
or in the background with the -d flag
```
node1# sudo salt-minion -d
```
now go back to node0 and accept the minions into the salt stack
```
node0# sudo salt-key -A
```

Now you can test and see if salt can see all of the nodes
```
node0# salt "*" test.ping
node0:
    True
node1:
    True
node2:
    True
node3:
    True
node4:
    True
```

1. Configure Salt states 
1. Configure Salt Pillar
1. Download Salt Formula for CAADE

### Install Gluster
#### Install Gluster on each of the nodes (node[0-4])
```
node0# sudo apt-get update
```
Install GlusterFS package using the following command.
```
node0# sudo apt-get install -y glusterfs-server
```
Start the glusterfs-server service on all gluster nodes.
```
node0# sudo service glusterfs-server start
```
#### Create Volumes for Gluster to use
This assumes that you already have drives that have been mounted.
```
sudo mkdir -p /data/gluster
sudo mount /dev/sdb1 /data/gluster
```
Add an entry to /etc/fstab for keeping the mount persistent across reboot.
```
echo "/dev/sdb1 /data/gluster ext4 defaults 0 0" | sudo tee --append /etc/fstab
```
Now attach all of the nodes to each other. Go to node0 and type the following.
```
node0# sudo gluster peer probe node1
node0# sudo gluster peer probe node2
node0# sudo gluster peer probe node3
node0# sudo gluster peer probe node4
```

Now you can add volumes to the gluster cluster
```
node0# salt "*" cmd.run "mkdir -d /data/gluster/gvol0"
node0# sudo gluster volume create gvol0 replica 2 node1:/data/gluster/gvol0 node2:/data/gluster/gvol0
node0# sudo gluster volume start gvol0
node0# sudo gluster volume info gvol0
```

#### Mount Gluster Volumes on all of the nodes.

Now you have created a volume and now you can access it on all of the nodes by mounting it.
```
node0# mkdir /mnt/glusterfs
node0# mount -t glusterfs node1:/gvol0 /mnt/glusterfs
```

To make the mount permanent across reboots you need to add it to the fstab
```
node0# echo "node1:/gvol0 /mnt/glusterfs glusterfs  defaults,_netdev 0 0" | echo tee --append /etc/fstab
```

Additional information can be found [here](http://www.itzgeek.com/how-tos/linux/ubuntu-how-tos/install-and-configure-glusterfs-on-ubuntu-16-04-debian-8.html)

### Docker Swarm
There is a great blog on how to generically set this up [here](http://btmiller.com/2016/11/27/docker-swarm-1.12-cluster-orchestration-with-saltstack.html).

1. Using Salt Stack install 
1. Test Docker Swarm Installation
