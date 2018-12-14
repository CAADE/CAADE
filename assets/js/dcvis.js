class DCVis {
  constructor(container, options) {
    this.container = container;
    this.nodesMap = {};
    this.edgesMap = {};
    this.nodes = new vis.DataSet([]);
    this.edges = new vis.DataSet([]);
    this.network = {};
    this.options = options;


    let data = {
      nodes: this.nodes,
      edges: this.edges
    };
    this.network = new vis.Network(this.container, data, this.options);
    this.network.on('stabliized', function (params) {
      this.fit({animation: true});
    });
    this.network.dcvis = this;
    this.network.on('selectNode', function (params) {
      const retval = this.dcvis.getAllNodes(params.nodes, null);
      this.setSelection(retval, {unselectAll: true, highlightEdges: false});
    });
  }

  getAllNodes(nodes, direction) {
    if (!direction) {
      let retval = {nodes: nodes, edges: []};
      let selection = this.getAllNodes(nodes, 'to');
      retval.nodes = retval.nodes.concat(selection.nodes);
      retval.edges = retval.edges.concat(selection.edges);

      selection = this.getAllNodes(nodes, 'from');
      retval.nodes = retval.nodes.concat(selection.nodes);
      retval.edges = retval.edges.concat(selection.edges);
      return retval;
    }
    else {
      let retval = {nodes: nodes, edges: []};
      for (let i = 0; i < nodes.length; i++) {
        if (this.nodesMap.hasOwnProperty(nodes[i])) {
          let nnodes = this.nodesMap[nodes[i]][direction];
          let selection = this.getAllNodes(nnodes, direction);
          retval.nodes = retval.nodes.concat(selection.nodes);
          retval.edges = retval.edges.concat(selection.edges);
          for (let j = 0; j < nnodes.length; j++) {
            if (direction === 'to') {
              retval.edges.push(nodes[i] + '-' + nnodes[j]);
            }
            else {
              retval.edges.push(nnodes[j] + '-' + nodes[i]);
            }
          }
        }
      }
      return retval;
    }
  }

  addNode(lnodes) {
    let mnodes = [];
    for (let i = 0; i < lnodes.length; i++) {
      let node = lnodes[i];
      /* if (node.group === 'Instance') {
        node.level = (i % 3) + 3;
      }
      else if (node.group === 'rcompute') {
        node.level = (i % 3) + 8;
      }
      */
      if (!this.nodesMap.hasOwnProperty(node.id)) {
        this.nodesMap[node.id] = {node: node, to: [], from: []};
      }
      else {
        this.nodesMap[node.id].node = node;
      }
      mnodes.push(node);
    }
    this.nodes.update(mnodes);
    this.network.fit();
  }

  removeNode(id) {
    if (this.nodesMap.hasOwnProperty(id)) {
      let dnode = this.nodesMap[id];
      // Need to delete edges associated
      // Find the id in the edgesMap
      for (let i = 0; i < dnode.from.length; i++) {
        let eid = dnode.from[i] + '-' + dnode.node.id;
        if (this.edgesMap.hasOwnProperty(eid)) {
          delete this.edgesMap[eid];
          this.edges.remove(eid);
        }
        let newNodes = [];
        for (let j = 0; j < this.nodesMap[dnode.from[i]].to.length; j++) {
          if (this.nodesMap[dnode.from[i]].to[j] !== id) {
            newNodes.push(this.nodesMap[dnode.from[i]].to[j]);
          }
        }
        this.nodesMap[dnode.from[i]].to = newNodes;
      }
      for (let i = 0; i < dnode.to.length; i++) {
        let eid = dnode.node.id + '-' + dnode.to[i];
        if (this.edgesMap.hasOwnProperty(eid)) {
          delete this.edgesMap[eid];
        }
        let newNodes = [];
        for (let j = 0; j < this.nodesMap[dnode.to[i]].from.length; j++) {
          if (this.nodesMap[dnode.to[i]].from[j] !== id) {
            newNodes.push(this.nodesMap[dnode.to[i]].from[j]);
          }
        }
        this.nodesMap[dnode.to[i]].from = newNodes;
      }
      delete this.nodesMap[id];
    }
    this.nodes.remove(id);
  }

  addEdge(edge) {
    let id = edge.from + '-' + edge.to;
    edge.id = id;
    if (!this.edgesMap.hasOwnProperty(id)) {
      edge.updated = true;
      edge.value = 1;
      this.edgesMap[id] = edge;
    }
    else {
      this.edgesMap[id].updated = true;
      this.edgesMap[id].value++;
    }
    if (!this.nodesMap.hasOwnProperty(edge.from)) {
      this.nodesMap[edge.from] = {from: [], to: []};
    }
    this.nodesMap[edge.from].to.push(edge.to);
    if (!this.nodesMap.hasOwnProperty(edge.to)) {
      this.nodesMap[edge.to] = {from: [], to: []};
    }
    this.nodesMap[edge.to].from.push(edge.from);
  }

  removeEdge(from, to) {
    let id = from + '-' + to;
    if (this.edgesMap.hasOwnProperty(id)) {
      delete this.edgesMap[id];
      this.edges.remove(id);
    }
  }

  drawEdges(opts) {
    let items = [];
    if (!opts) {
      opts = {force: false};
    }
    for (let id in this.edgesMap) {
      if (opts.force || this.edgesMap[id].updated) {
        let edge = this.edgesMap[id];
        edge.width = edge.value;
        edge.color = {color: 'gray', highlight: 'blue'};
        edge.highlight = 'blue';
        delete edge.value;
        delete edge.updated;
        items.push(edge);
        this.edgesMap[id].updated = false;
      }
    }
    this.edges.update(items);
    this.network.fit();
  }
}

