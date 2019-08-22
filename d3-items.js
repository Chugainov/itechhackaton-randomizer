const itemHeight = 80;
const selector = '.holder';
const animTime = 1000;
const cardsPerRow = 4;

const layoutInfo1 = {
  // ---- row position & size
  valueTop: function(d, i){return i * (itemHeight + 1) + 'px'},
  indexTop: function(d, i){return (i * (itemHeight + 1)) - 10 + 'px'},
  height: itemHeight,
  width: 300,
  // ---- row border-radius
  radius: 5,
  // ---- table header
  headerOpacity: 1,
  headerLeft: 0,
  // ---- column 1
  indexLeft: -90,
  // ---- column 2
  valueLeft: -50,
  valueFontSize: 16,
};

const layoutInfo = {
  // ---- card position & size
  valueTop: function(d, i){return Math.floor(i/cardsPerRow)*90+'px'},
  indexTop: function(d, i){return 5 + Math.floor(i/cardsPerRow)*90+'px'},
  indexLeft: function(d, i){return (i%cardsPerRow)*300 - 610 + 'px'},
  valueLeft: function(d, i){return (i%cardsPerRow)*300 - 550 + 'px'},
  height: 80,
  width: 200,
  // ---- card border-radius
  radius: '5px',
  // ---- table header (hidden)
  headerOpacity: 0,
  headerLeft: -650,
  // ---- line 1
  c1Top: 10,
  c1Left: 10,
  c1FontSize: 18,
  // ---- line 2
  c2Top: 37,
  c2Left: 10,
}


let holder;

function render(){
  holder = d3.select(selector);
  
  holder.selectAll('.item')
    .data(data, () => 'item')
    .enter()
    .append('div').attr('class', () => 'index')
    .style('top', layoutInfo.indexTop)
    .html((d, index) => ++index);

	holder.selectAll('.item')
		.data(data, () => 'item')
		.enter()
    .append('div').attr('class', () => 'item')
    .style('top', layoutInfo.indexTop)
    .html((d) => d.name);

	layout(true);
}

function beautifulRandomize(times) {
  hideNumbers();
  let timesRun = 0;
  const interval = setInterval(function(){
      timesRun += 1;
      if(timesRun === times) {
        clearInterval(interval);
        setTimeout(showNumbers, 1000);
      }
      shuffle();
  }, 1000); 
}

function shuffle() {
  let currentIndex = data.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = data[currentIndex];
    data[currentIndex] = data[randomIndex];
    data[randomIndex] = temporaryValue;
  }

  layout(false);
}

function hideNumbers() {
  const	t = d3.transition().duration(animTime);

  holder.selectAll('.index').transition(t)
    .style('opacity', 0);
}

function showNumbers() {
  const	t = d3.transition().duration(animTime);

  holder.selectAll('.index').transition(t)
    .style('visibility', 'visible')
    .style('opacity', 100);
}

function layout(skipAnim){
	const	t = d3.transition().duration(skipAnim ? 0 : animTime);

	holder.selectAll('.item')
		.data(data, function(d){return d.name})
		.transition(t)
		.style('left', layoutInfo.valueLeft)
		.style('top', layoutInfo.valueTop)
		.style('height', layoutInfo.height)
		.style('width', layoutInfo.width)
    .style('border-radius', layoutInfo.radius);
    
  holder.selectAll('.index').transition(t)
    .style('visibility', 'hidden')
    .style('top', layoutInfo.indexTop)
    .style('left', layoutInfo.indexLeft);

  // const totalHeight = 20 + data.length * (itemHeight + 1);
  const totalHeight = 110 + (data.length / cardsPerRow) * (itemHeight + 1);

  holder.transition(t)
    .style('height', totalHeight);
}
