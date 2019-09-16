/*
    Chpage : change page easily
    Author : shawroger
    it is light to use ^_^
*/
(function(global,factory) {   
    if (typeof define ==='function') {
        define(function(){
            return (global.Chpage = factory());
        });
    }
    else if (typeof exports === 'object') {
        module.exports = factory();
    }
    else {
        global.Chpage = factory();
    }
} (this, function () {

    'use strict';

    //define this object
    var self = {}; 

    //store the keydown events 
    self.key = [];

    //init the first page 
    self.page = 0;

    //render mode
    self.mode = [0];

    //automatic running
    self.auto = true;  

    //verison  
    self.version = '3.0.0';


    //bind an element or list of elements used as a page
    self.bind = function (selector, event, callback) {
        var el = document.querySelectorAll(selector);
        for (var i = 0; i < el.length; i++) {
            el[i].addEventListener(event, callback.bind(this, i));
        }       
    }; 


    //goto any page
    self.goto = function (page = 0) { 

        if (typeof page !== "number") {
            console.error('param must be a number');
            return false;
        }

        if (Math.floor(page) !== page) {
            console.error('param must be an integer');
            page = Math.floor(page);
        }

        if (page < 0) {
            page=0;
        }   
        if (page >= this.length) {
            page = this.length-1;
        }  
        if (this.running.flow) {
            this.running.page = page;
        }

        //change the pointer (this.page)
        this.page = page;

        /* main function */

        for (var i = 0; i < this.list.length; i++) {         
            if (this.mode.includes(parseInt(i-page) )) {
                this.list[i].style.display = "block";
            } else {
                this.list[i].style.display = "none";
            }
        }
    };

    //get the node list
    self.match = function (selector) {
        this.list = document.querySelectorAll(selector);
        this.length = this.list.length;
        if (this.auto) {
            this.goto(0);
        }
    };

    //pageup or pagedown
    self.move = function (command) {
        if (typeof command === "number") {
            this.page = this.page + command;
            this.goto(this.page);
        } else {
            console.error('invaild command');
        }
    };

    //config running system
    self.running = {
        step: 1,
        flow: true,       
        time: 1000,
        round: true,
        status: true,             
    };


    self.run = function () {

        this.running.status = true;

        if(this.running.round) {
            //set an interval function
            this.running.timer = setInterval( () => {
                if(this.running.page === 0){
                    this.running.step = Math.abs(this.running.step);
                }               
                if(this.running.page === this.length-1) {
                    this.running.step = -1 * this.running.step;
                }               
                if(this.running.page <= this.length-1) {
                    this.running.page = this.running.page + this.running.step;
                    this.goto(this.running.page);
                }
                
            }, this.running.time);
        } else {

            //set an interval function
            this.running.timer=setInterval( () => {
                this.running.page = this.running.page + this.running.step;
                if(this.running.page >= this.length) {
                    this.running.page = 0;
                    this.goto(0);
                } else {
                    this.goto(this.running.page);
                }
                
            }, this.running.time);
        }
        
    };

    //stop the interval function
    self.stop = function () {
        this.running.status = false;
        clearInterval(this.running.timer);
    };

    self.loop = function (
        time = this.running.time, 
        round = this.running.round, 
        flow = this.running.flow, 
        step = this.running.step 
    ) {

        this.running.time = time;        
        this.running.round = round;
        this.running.step = Math.floor(step);

        this.running.status = true;

        if (this.auto) {
            this.run();
        }
        
    };

    self.new = function() {   
        return Object.assign({},this);
    };


    self.keydown = function(key, callback){ 
        var _key={
            code: key,
            method: callback
        };      
        this.key.push(_key);
        document.onkeydown = (el) => {
            for (var i in this.key) {
                if (this.key[i].code === el.keyCode) {
                    this.key[i].method.call(this);
                }
            }
        };

    };

    self.goEnd = function() {
        this.goto(this.length-1);
    };
    
    return self;
}));
