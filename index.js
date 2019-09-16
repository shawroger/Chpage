(function(global,factory){   
    if(typeof define==='function'){
        define(function(){
            return (global.Chpage=factory());
        });
    }
    else if(typeof exports==='object'){
        module.exports=factory();
    }
    else{
        global.Chpage=factory();
    }
}(this,function(){
    'use strict';

    let self={}; 
    self.page=0;
    self.auto=true;
    self.mode=[0];
	self.version='2.2.0';

    self.bind=function(selector,action,command){
    	let el=document.querySelectorAll(selector);
        for(let i=0;i<el.length;i++){
        	el[i].addEventListener(action,command.bind(this,i));
        }
        
    }; 


    self.mask=function(page=0){ 
    	if(typeof page!=="number"){
    		console.error('param must be a number');
    		return false;
	}
    	if(Math.floor(page)!==page){
    		console.error('param must be an integer');
    		page=Math.floor(page);
    	}
    	if(page<0){
    		console.error('param must be a positive number');
    		page=0;
    	}	
    	if(page>=this.length){
    		console.error('param is too large');
    		page=this.length-1;
    	}  

    	this.page=page;
    	if(this.running.flowing){
    		this.running.page=page;
    	}
    	let list=this.list;

        /* main function */

    	for(let i=0;i<list.length;i++){  		
    		if(this.mode.includes(parseInt(i-page))){
    			list[i].style.display="block";
    		}else{
                list[i].style.display="none";
            }
    	}
    };

    self.match=function(selector){
    	this.list=document.querySelectorAll(selector);
    	this.length=this.list.length;
    	if(this.auto){
    		this.mask();
    	}
    };

    self.move=function(command){
        if(typeof command==="number"){
            this.page=this.page+command;
            this.mask(this.page);
        }else{
            console.error('invaild command');
        }
    };


    self.running={status:true,time:1000,round:true,flowing:true};

    self.run=function(){
    	if(this.running.status===false){
    		console.log('page running system stopped');
    		return false;
    	}
    	let that=this;
    	if(this.running.round===false){
    		this.running.timer=setInterval(function(){
    			that.running.page++;
    			if(that.running.page%that.length===0){
    				that.mask(0);
    			}else{
    				that.move(1);
    			}
    			
    		},this.running.time);
    	}else{
    		let roundStatus=1;
    		this.running.timer=setInterval(function(){
    			if(that.running.page===0){
    				roundStatus=1;
    			}   			
    			if(that.running.page===that.length-1){
    				roundStatus=-1;
    			}   			
    			if(that.running.page<=that.length-1){
    				that.running.page=that.running.page+roundStatus;
    				that.mask(that.running.page);
    			}
    			
    		},this.running.time);
    	}
   		
    };

    self.stop=function(){
        this.running.status=false;
    	clearInterval(this.running.timer);
    };

    self.config=function(time=this.running.time,round=this.running.round,flowing=this.running.flowing){
        this.running.config=this.config.bind(this);
    	this.running.page=this.page;
    	this.running.time=time;
    	this.running.flowing=flowing;
    	this.running.round=round;
        this.running.status=true;
    	if(this.auto){
    		this.run();
    	}
    	
    };

    self.new=function(){   
        return Object.assign({},this);
    };


    self.keydown=function(key,command){
        let that=this; 
        let _key={
            code: key,
            method: command
        };      
        this.keyCode.push(key);
        this.keyMethod.push(_key);
        document.onkeydown=function(e){
            if(that.keyCode.includes(e.keyCode)){
                for(let i in that.keyMethod){
                    if(that.keyMethod[i].code===e.keyCode){
                        that.keyMethod[i].method.call(that);
                    }
                }
            }
        };

    };

    self.goEnd=function(){
        this.goto(this.length-1);
    }

    self.goto=self.mask;
    self.loop=self.config;   
    self.keyMethod=[];
    self.keyCode=[];
    
    return self;
}));
