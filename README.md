# Chpage
a light css library to hide div as a page


# install it

```
npm intall chpage --save
```

# load in script

```
<script type="text/javascript" src="index.js"></script>
```

# Start a new example

``` javascript
import Chpage from 'chpage'

let my = Chpage.new()

/* use 'my' instead of 'Chpage' */
```

## Get the page list

For example,if you want to load these nodes as a page list,you need to give them a same name of css class.

``` html
/* use 'c-page' as an example*/
<div class="c-page">1</div>
<div class="c-page">2</div>
<div class="c-page">3</div>
<div class="c-page">4</div>
<div class="c-page">5</div>
<div class="c-page">6</div>
<div class="c-page">7</div>
<div class="c-page">8</div>
<div class="c-page">9</div>
```
Then,you can use **my.match()** to load them in the Chpage page list.

``` javascript
my.match('.c-page');
console.log(my.list); //view all the node list
```
There are some methods to change pages.
``` javascript
my.move(1) //pagedown
my.move(-1) //pageup
my.move(n/-n) //pageup or pagedown n pages
my.goto(0) //go to the firt page
my.goto(n) //go to the n.th page
my.goEnd(n) //go to the last page
```
you need not worry about turning the page excessively，**Chpage** has already control it from 0 to the last page.

## Get the page change method

Using bootstrap UI,we can make a pagination and give them a class style.
``` html
/* use 'c-list' as an example*/
<ul class="pagination">
	<li id="first"><a href="javascript:;">First</a></li>
	<li id="back"><a href="javascript:;">&laquo;</a></li>
	<li class="c-list"><a href="javascript:;">1</a></li>
	<li class="c-list"><a href="javascript:;">2</a></li>
	<li class="c-list"><a href="javascript:;">3</a></li>
	<li class="c-list"><a href="javascript:;">4</a></li>
	<li class="c-list"><a href="javascript:;">5</a></li>
	<li class="c-list"><a href="javascript:;">6</a></li>
	<li class="c-list"><a href="javascript:;">7</a></li>
	<li class="c-list"><a href="javascript:;">8</a></li>
	<li class="c-list"><a href="javascript:;">9</a></li>
	<li id="next"><a href="javascript:;">&raquo;</a></li>
	<li id="last"><a href="javascript:;">Last</a></li>
</ul>
```
Then,you can use **my.bind()** to use them as Chpage functions.

``` javascript
my.bind('.c-list','click',function(i){
	this.goto(i);
});

my.bind('#first','click,function(i){
	this.goto(0);
});

my.bind('#last','click,function(i){
	this.goEnd();
});

my.bind('#back','click,function(i){
	this.move(-1);
});

my.bind('#next','click,function(i){
	this.move(1);
});
```
In method **my.bind(selector,event,callback)** ,
if you load in selector more than two elements,
you can use param **i** in callback which is the index of the elements list.

## keydown event

It is similar to the **my.bind()** method.

``` javascript
// listen '<-' keydown event
my.keydown(37,function(){
	this.move('-');
});
// listen '->' keydown event
my.keydown(39,function(){
	this.move('+');
});
```
## loop method

``` javascript
my.loop(TIME,RETURN,FLOWING);
/* 
TIME is the time interval
RETURN means true , so the page will go from 0 to last and back the last to 0.
FLOWING means true , so the page will change with other events.
*/

my.stop() //stop loop function
my.loop() //continue loop function,the params has been stored in 'my.running' object.
```
