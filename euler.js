/**
* Find the Eulerian path of a graph
*/

$('#eulerian').on('click', function() {
  // get number of nodes and their degrees
  var nodesNum = gInstance.graph.nodes.length;
  var count = 0;
  var startingNodeId;

  // check the degree of each node
  for (var i=0; i<nodesNum; i++) {
    var degree = gInstance.graph.getIncidentEdges({ id: i }).length;
    if (degree % 2 === 1) {
      count++;
    }
    // set starting node of euler path in case there are just 2 odd vertices
    if ((degree % 2 === 1) && (typeof startingNodeId === 'undefined')) {
      startingNodeId = i;
    }
  }

  // no Eulerian path/cycle if there are vertices of odd degree (except 2 vertices)
  if (count > 0 && count !== 2) {
    addAlert('danger', 'No Euler path or circuit exists in this graph. Find out why <strong><a href="http://www.whitman.edu/mathematics/cgt_online/section05.02.html">here</a><strong>');
    return false;
  }
  else {
    addAlert('success', 'Here is the Euler path/cycle!');
    var player = new greuler.player.Generator(gInstance);
    
    if (typeof startingNodeId === 'undefined') {
      startingNodeId = 0;
    }
    
    player.run( function *algorithm(gInstance) {
      stack = [];
      path = [];

      findEulerPath(startingNodeId);

      // traversal path is defined in the path array
      for (var i = 0; i < path.length-1; i++) {
        yield function() {
          gInstance.selector.traverseAllEdgesBetween(
            { source: path[i], target: path[i + 1] }
          );
        }
      }    
    });
  }

});


var findEulerPath = function(currentNode) {
  stack.push(currentNode);
  var edges = gInstance.graph.getIncidentEdges({ id: currentNode });

  for (var i=0; i<edges.length; i++) {
    var edge = edges[i];
    // set next node
    var next = edge.target.id === currentNode ? edge.source.id : edge.target.id;
    if (edge.used) { continue; }
    edge.used = true;
    findEulerPath(next);
  }
  path.push(stack.pop());  
}

var addAlert = function(type, message) {
  if ($('.alert-field').is(':empty')) {
    var alert = $('<div class="alert alert-' + type + '" alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + message + '</div>')
    $('.alert-field').append(alert);
  }
}