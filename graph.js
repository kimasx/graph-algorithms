'use strict';

var greuler = window.greuler;

var gInstance = greuler({
  target: '.graph',
  width: 700,
  height: 500,
  data: greuler.Graph.random({    
    order: 5,
    size: 5,
    connected: true,
    animationTime: 500
  })
}).update();

/**
* Generate a random graph, given its order and size
*/
$('#generate-btn').on('click', function() {
  var order = parseInt($('.order').val());
  var size = parseInt($('.size').val());
  var newDiv = $("<div class='graph'></div>");
  
  if (!size && !order) {
    alert('Please select graph order and size you want to render.');
  }

  else {
    $('.graph-container').empty().append(newDiv);
    $('.alert-field').empty();
    gInstance = greuler({
      target: '.graph',
      width: 700,
      height: 500,
      data: greuler.Graph.random({    
        order: order,
        size: size,
        connected: true,
        animationTime: 500
      })
    }).update();
  }
  
});
