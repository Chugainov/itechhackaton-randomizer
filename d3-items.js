const itemHeight = 35;
const selector = '.holder';
const animTime = 1000;

const layoutInfo = {
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

  holder.selectAll('.item')
		.data(data, function(d){return d.name})
		.transition(t)
		.style('left', layoutInfo.valueLeft + 10)

  holder.selectAll('.index').transition(t)
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
    .style('top', layoutInfo.indexTop)
    .style('left', layoutInfo.indexLeft);

  const totalHeight = 20 + data.length * (itemHeight + 1);

  holder.transition(t)
    .style('height', totalHeight);
}
