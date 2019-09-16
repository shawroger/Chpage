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
