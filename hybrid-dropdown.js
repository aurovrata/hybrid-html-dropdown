/*
Hybrid Dropdown JavaScript plugin
Version: 2.0
Authors: Sandrina Pereira & Aurovrata Venet
Twitter: @a_sandrina_p / @aurovrata
GitHub: https://github.com/aurovrata/hybrid-html-dropdown
*/

// global module creation
(function (factory) {
  typeof define === 'function' && define.amd
    ? define(factory)
    : typeof exports === 'object'
      ? (module.exports = factory())
      : factory()
})(function () { //hybrid-select factory.
	let _window = typeof window !== 'undefined' ? window : this;
	let HybridDropdown = (_window.HybridDropdown = function (elm, settings) {
    //verify we have an element and a source
    if(!elm || !(elm instanceof Element)){
      throw new Error("HybridDropdown requires a DOM element to intialise.");
    }

    let _ = this, lim=1;
    _.isDS = false; //track source

    switch(true){
      case elm.nodeName === "SELECT": //select field source.
        if(elm.multiple) lim=-1;
        elm.style="width:1px;height:1px"; //hide the origial select field.
        break;
      case 'object' == typeof settings['dataSet'] && Object.getPrototypeOf(settings['dataSet'])===Object.prototype:
        _.isDS = true;// dateset source.
        break;
      default:
        throw new Error("HybridDropdown requires either a <select> element or a dataSet defined in its settings.");
    }
    //if already instanciated, return existing object.
    if(elm._hybriddd) return elm._hybriddd;
    elm._hybriddd = _; //expose object in its original DOM element.
    _.el = elm; //keep original element reference.
    _.el.classList.add('hybridddised'); //flag the element as converted.
    // merge user setting with defaults
    _.opt = Object.assign(
      {}, //empty target.
      {
        eventPropagate:true,
        dropdown: 'vertical',
        limitSelection:lim, //default 1, -1 for multiple, or userset.
        optionLabel: function(label){
          return '<span>'+label+'</span>';
        },
        selectedLabel: function(s){
          let k =  Object.keys(s);
          return s[k[0]]+ ((k.length>1)?'<span>[...]</span>':'');
        },
        defaultText:'---',
        fieldName: '',
        listOption: function(o,i){return true},
        selectedValues:[],
      }, //default settings.
      settings //user settings.
    );
    _.multi = _.opt.limitSelection !=1; //flag multi select field.
    //check if we have a field name.
    if(_.isDS){
      if(_.opt.fieldName.length==0) _.opt.fieldName = _.el.getAttribute('id'); //try to set it to id.
      if(_.multi && _.opt.fieldName.length>0 && _.opt.fieldName.indexOf('[]')<0) _.opt.fieldName +='[]';
    }
    //initialise the hybrid-dd.
    _.init(true);
    return _;
	});
  /* Prototyping some methods for HybridDropdown object */
  let hsProtype = HybridDropdown.prototype;
  //initialisation function.
  hsProtype.init = function(init){
    let _ = this;

    if(init) {
      //wrapper for select and hybrid select.
      // let c = document.createElement('div');
      _.hdd = document.createElement('div');
      if(_.isDS) _.el.prepend(_.hdd);
      else{
        _.el.parentNode.insertBefore(_.hdd, _.el.nextSibling);
        _.hdd.style['margin-left']='-'+_.el.getBoundingClientRect()['width']+'px';
      }
      // c.appendChild(_.el);
      //construct the hybrid-select.
      // _.hdd = document.createElement('div');
      // _.el.parentNode.appendChild(_.hdd);
      //hide original element.
      // _.el.style.display='none';
      _.hdd.classList.add('hybrid-dropdown')
      // _.hdd.setAttribute('aria-hidden', true);//hide from readers.
      _.hdd.selected = document.createElement('div');
      _.hdd.appendChild(_.hdd.selected);
      _.hdd.selected.classList.add('hybriddd-selected');
      _.hdd.ddlist = document.createElement('ul');
      _.hdd.appendChild(_.hdd.ddlist);
      _.hdd.ddlist.classList.add('hybriddd-options');
      _.hdd.options = {};
      _.hindex = []; //initial option hover index.
      _.sindex = []; //initial index of selected option.
      _.value = {}; //initial value.
    }
    //set style.
    _.hdd.classList.add('hybriddd-'+_.opt.dropdown);
    //build list of options.
    let opts = null;
    if(_.isDS){
      _.hdd.classList.add('hybriddd-custom');
      opts = Object.entries(_.opt.dataSet);
    }
    else opts = _.el.children;
    opts = _.buildOptionList(opts,0);
    _.hdd.ddlist.replaceChildren(...opts);
    // _.hdd.ddlist.style.width = (_.hdd.ddlist.offsetWidth + 10)+"px";

    if(init){
      //bind some events....
      //listen for 'change' on the original select.
      _.event(_.el,'add',{
        change: _.updateFromOriginal.bind(_),
        focus: _.originalElementFocus.bind(_)
      });
      let getOption = _.optionsSelected.bind(_);
      _.event(_.hdd.ddlist,'add',{
        click: getOption,
        keydown: getOption
      });
      //listen for click and down arrow events.
      _.open = _.openSelect.bind(_);
      _.event(_.hdd, 'add',{
        click: _.open
      });
      //create a close function.
      _.close = _.closeSelect.bind(_, true);
      //blur function
      _.blur = _.blurField.bind(_);
      //navigate with keys.
      _.keyNav = _.keyboardNavigate.bind(_);
      //fire init event.
      _.emit('hybrid-dd-init');
      //refresh fn.
      _.refresh = _.refreshHybrid.bind(_);
    }
  }
  //method to refresh an existing HybridDropdown object.
  hsProtype.refreshHybrid = function(settings={}){
    let _ = this;
    _.opt = Object.assign({}, _.opt, settings);
    _.init(false); //invole init function but do not initialise.
  }
  //method to initialise options.
  hsProtype.buildOptionList = function(list,p){
    let _ = this,
      opts=[],
      t=(_.multi) ? 'checkbox':'radio',
      fname = (_.opt.fieldName.length>0 ? ' name="'+_.opt.fieldName+'"':'');

    [].forEach.call(list,(o,i) => {
      //TODO: check if o is optgrp, and loop over.
      if(_.opt.listOption(o,i) !== true) return;

      let hso = document.createElement('li'),
       isGroup = false, isSelected = false, hasChildren = false, lbl, val, kids=[], icl='';
      if(_.isDS){
        lbl = o[0];
        val=null;
        switch(true){
          case typeof o[1] === 'object':
            hasChildren = isGroup = true;
            if('undefined' != typeof o[1]['label']){
              val = o[0];
              lbl = o[1]['label'];
              kids = Object.entries(o[1]).slice(1);
              isGroup = false;
            }else kids = Object.entries(o[1]);
            break;
          default:
            icl = 'hybridddis';
            val = o[0];
            lbl = o[1];
            isSelected = _.opt.selectedValues.indexOf(val) >=0;
        }
      }else{
        switch(o.nodeName){
          case 'OPTGROUP':
            hasChildren = isGroup = true;
            lbl = o.label;
            kids = o.children;
            break;
          default:
            icl = 'hybridddin';
            lbl = o.text;
            val = o.value;
            isSelected = o.selected;
        }
      }
      switch(isGroup){
        case true:
          hso.innerHTML ='<span>'+lbl+'</span>';
          hso.classList.add('hybriddd-group');
          break;
        default:
          if(isSelected){
            _.value[val] = lbl;
            hso.classList.add('active');
          }
          //preserve select options attributes.
          // for(let k in o.dataset) hso.dataset[k]=o.dataset[k];
          hso.innerHTML = '<label class="hybriddd-l'+p+'">'+
            '<input class="'+icl+'" type="'+t+'" value="'+val+'"'+fname+' />'+
            '<span>'+ lbl +'</span>' +
            '</label>';
          hso.classList.value = 'hybriddd-option';
          if(!_.isDS) hso.classList.value += o.classList.value; // + (o.value!=''?'hybriddd-'+o.value:'');
          _.hdd.options[val] = hso;
          break;
      }
      if(hasChildren){
        let cos = _.buildOptionList(kids, p+1),
          ul = document.createElement('ul');
        ul.replaceChildren(...cos);
        hso.appendChild(ul);
      }
      opts[opts.length] = hso;
    });
    if(0==p){ //first level end.
      if(0==Object.keys(_.value).length){
        if(_.hdd.options['']){
          _.value['']=_.hdd.options[''].querySelector('label').innerText;
          _.hdd.options[''].classList.add('active');
          _.sindex.push('');
        }else _.value[''] = _.opt.defaultText;
      }
      _.hdd.selected.innerHTML = _.opt.selectedLabel(_.value);
    }
    return opts;
  }
  //method to add event listeners.
  hsProtype.event = function (ele, type, args) {
    var eventHandler = ele[type + 'EventListener'].bind(ele)
    Object.keys(args).forEach(function (k) {
      if('mouseenter'===k)   eventHandler(k, args[k],true);
      else eventHandler(k, args[k])
    })
  }
  //method to update the hybrid select value.
  hsProtype.updateSelection = function(idxs, emit){
    let _ = this,
      v = idxs[0];
    switch(_.opt.limitSelection){
      case 1: //default
        if(_.sindex.length>0) _.optionClass('active', _.sindex);
        _.sindex[0] = v;
        _.value={};
        _.hdd.options[v].classList.add('active');
        //update values.
        _.el.value = v;
        _.value[v] = _.hdd.options[v].querySelector('label').innerText;
        //update the selected label.
        _.hdd.selected.innerHTML = _.opt.selectedLabel(_.value);
        break;
      case -1: //unlimited
      default: //limit number of selections.
        _.optionClass('active',_.sindex); //toggle active class.
        if(_.opt.limitSelection < 0) _.sindex=idxs;
        else _.sindex=idxs.slice(0,_.opt.limitSelection);
        //update values.
        _.value = {};
        _.el.selectedIndex = -1;
        _.sindex.forEach(v=>{
          _.hdd.options[v].classList.add('active');
          _.value[v]=_.hdd.options[v].querySelector('label').innerText;
          _.el.querySelector('option[value="'+v+'"]').selected=true;
        });
        //update the selected label.
        _.hdd.selected.innerHTML = _.opt.selectedLabel(_.value);
        break;
    }
    if(emit) _.emit('change');
  }
  //update from original
  hsProtype.updateFromOriginal = function(){
    let _ = this, vs=[];
    if(_.multi){
      let skipUpdate = true;
      for(let i=0; i<_.el.selectedOptions.length; i++){
        if(!(_.el.selectedOptions.item(i).value in _.value) ){
          vs.push(_.el.selectedOptions.item(i).value);
          skipUpdate=false;
        }
      }
      if(skipUpdate) return;
    }else if(_.el.value in _.value) return; //not need to update.
    else vs.push(_.el.value);

    _.updateSelection(vs, false);
  }
  //trigger events.
  hsProtype.emit = function (name, arg) {
    let _ = this,
      e = new _window.CustomEvent(name, {
      bubbles: true,
      detail: arg
    })
    _.el.dispatchEvent(e)
  }
  //focus hybrid select when the original select is tabbed into.
  hsProtype.originalElementFocus = function(){
    let _ = this;
    if(_.el.disabled) return;
    _.el.blur();
    _.hdd.focus({preventScroll:true});
    _.hdd.classList.add('focus');
    //cancel window scrolling on space bar.
    _.event(_window,'add',{
      keydown:_.keyNav
    });
    _.event(document,'add',{
      click: _.blur
    })
  }
  //TODO: onblur, clean up window keydown event.
  hsProtype.blurField = function(){
    let _ = this;
    _.hdd.classList.remove('focus');
    _.event(_window,'remove',{
      keydown:_.keyNav
    })
  }
  //find next hybrid-option index.
  hsProtype.nextOption = function(cur){
    let _ = this,
      keys = Object.keys(_.hdd.options),
      next = (cur.length>0?keys.indexOf(cur[cur.length-1]):-1);
    if(next < keys.length) next++;
    if(next === keys.length) next=0;//end of list.
    return keys[next];
  }
  //find prev option.
  hsProtype.prevOption = function(cur){
    let _ = this,
      keys = Object.keys(_.hdd.options),
      prev = (cur.length>0?keys.indexOf(cur[0]):keys.length);
    if(prev >= 0 ) prev--;
    if(prev < 0) prev =keys.length-1;//end of list.
    return keys[prev];
  }
  //key navigation.
  hsProtype.keyboardNavigate = function(){
    let _ = this, e = arguments[0], v;
    if(_.el.disabled) return;
    if(e && e.keyCode){
      e.preventDefault(); //stop page scroll.
      switch(e.keyCode){
        case 40: //down arrow.
          if(_.hdd.classList.contains('active')){ //list is open, change hover option
            if(_.hindex.length>0 && !_.multi || !e.shiftKey) _.optionClass('hover', _.hindex); //toggle class
             v = _.nextOption(_.hindex);
            _.hdd.options[v].classList.add('hover');
            if(_.multi && e.shiftKey){
              _.hindex.push(v);
              if(_.opt.limitSelection>0) _.hindex = _.hindex.slice(-1*_.opt.limitSelection);
            }else _.hindex[0] = v;
          }else{ //change select value
            if(1==_.opt.limitSelection){ //select the next value.
              v = _.nextOption(_.sindex);
              _.updateSelection([v], true);
            }else{ //open the dropdown.
              _.hdd.classList.remove('focus');
              _.open();
            }
          }
          break;
        case 38: //up arrow.
          if(_.hdd.classList.contains('active')){ //list is open, change hover option
            if(_.hindex.length>0 && !_.multi || !e.shiftKey) _.optionClass('hover', _.hindex);
            v = _.prevOption(_.hindex);
            _.hdd.options[v].classList.add('hover');
            if(_.multi && e.shiftKey){
              _.hindex.push(v);
              if(_.opt.limitSelection>0) _.hindex = _.hindex.slice(-1*_.opt.limitSelection);
            }else _.hindex[0] = v;
          }else{ //change select value
            if(1==_.opt.limitSelection){ //select the next value.
              let v = _.prevOption(_.sindex);
              _.updateSelection([v], true);
            }else{ //open the dropdown.
              _.hdd.classList.remove('focus');
              _.open();
            }
          }
          break;
        case 13: //enter.
        case 32: //spacebar.
          if(_.hdd.classList.contains('active') === false){//open the list.
            _.hdd.classList.remove('focus');
            _.open();
          }else{
            _.updateSelection(_.hindex, true);
            _.closeSelect(false);
            _.hdd.classList.add('focus');
          }
          break;
        case 27: //esc
          if(_.hdd.classList.contains('active')) _.closeSelect(false); //close list if open
          _.blurField(); //blur.
          break;
        case 9: //tab key, navigate to next field.
          if(_.hdd.classList.contains('active')) _.closeSelect(false); //close list if open
          _.blurField(); //blur.

          //check if field has tab index.
          let tidx = _.el.getAttribute('tabindex'),
            form = _.el.closest('form'),
            next, cur;

          if(form === null) form = document;
          if(tidx != null && tidx != ''){
            tidx +=1;
            next = form.querySelector('[tabindex="'+tidx+'"]');
          }else if(form !== document){ //find current field sibling.
            cur = _.el;
            if(_.isDS){
              cur = Object.keys(_.hdd.options);
              tidx = cur[cur.length-1]; //last key.
              cur = _.hdd.options[tidx].querySelector('input');
            }
            for(tidx in form.elements){
              if(form.elements[tidx] !== cur) continue; //move to next element.

              do{
                tidx++
              }while(tidx<form.elements.length && form.elements[tidx].classList.contains('hybridddin'));
              if(form.elements.length==tidx) tidx=0;
              if(form.elements[tidx].classList.contains('hybridddis')){
                next = form.elements[tidx].closest('.hybriddd-custom');
              }else{
                next = form.elements[tidx];
              }
              break;
            }
          }
          if(null!=next){
            switch(true){
              case next.classList.contains('hybriddd-custom'):
                next.parentElement._hybriddd.originalElementFocus();
                break;
              case next.type === 'text':
                next.select();
                break;
              default:
                next.focus();
                break;
            }
          }
      }
    }
  }
  //options selected.
  hsProtype.optionsSelected = function(){
    let _ = this, e = arguments[0];
    if(e && e.target && e.target.parentNode.classList.contains('hybriddd-option')){
      let sel = _.hindex;
      // if ctrl key, then get symmetrical difference between active and hover.
      if(e.ctrlKey) sel = _.sindex.filter(i=> !_.hindex.includes(i)).concat(_.hindex.filter(i=>!_.sindex.includes(i)));
      _.updateSelection(sel, true);
      //close the dropdown
      if(!e.ctrlKey && !e.shiftKey) _.closeSelect(e.type==='click');
    }
  }
  //function to flag options being hovered.
  hsProtype.optionHover = function(){
    let _ = this, v,
      e = arguments[0],
      t = e.target;
    if(!e.shiftKey){
      if(_.hindex.length>0){
        _.optionClass('hover',_.hindex);
        _.hindex=[];
      }
      return; //track shift mouseenter events only.
    }
    if(t.classList.contains('hybriddd-option')) {
      v = t.querySelector('input').value;
      if(_.multi && e.shiftKey){
        if(_.hindex.includes(v)){
          v =_.hindex[(_.hindex.length-1)]; //toggle last inserted idx.
          _.hindex =_.hindex.slice(0,-1);
        }else _.hindex.push(v);
        if(_.opt.limitSelection>0) _.hindex = _.hindex.slice(0,_.opt.limitSelection);
      }else _.hindex = [v];

      _.optionClass('hover',[v]);
    }
  }
  //toggle class on option.
  hsProtype.optionClass = function(cl, els=[]){
    let _ = this;
    if('string' == typeof cl && cl.length>0){
      els.forEach(v=>{
        _.hdd.options[v].classList.toggle(cl);
      })
    }
  }
  //open hybrid dropdown.
  hsProtype.openSelect = function(){
    let _= this, e = arguments[0];
    if(_.el.disabled) return;
    if(e && e.target){ //triggered by event?
      if(e.target.classList.contains('hybriddd-options') || e.target.closest('.hybriddd-options')){
        return;  // bubbling selection
      }
      e.stopPropagation();
      _.emit('hybrid-dd-'+e.type); //notify other hdd fields that his one is being opened.
    }
    if(_.hdd.classList.contains('active')) {
      _.closeSelect();
      return;
    }
    _.hdd.classList.add('active');
    //adjust width of dropdown.
    if(0==_.hdd.ddlist.style.width.length) _.hdd.ddlist.style.width=(_.hdd.ddlist.offsetWidth + 10)+"px";
    if(_.multi){
      _.event(_.hdd.ddlist,'add',{
        mouseenter: _.optionHover.bind(_)
      });
    }
    //listen for external clicks to close.
    _.event(document, 'add',{
      click: _.close
    });
    //listen for key navigation
    _.event(_window,'add',{
      keydown:_.keyNav
    });
    //close if another hdd field opens.
    _.event(document,'add',{
      'hybrid-dd-click':_.close
    });
  }
  //close hybrid dropdown.
  hsProtype.closeSelect = function(blur){
    let _ = this,
      e = arguments[0],
      e2 = arguments[1]; //click on document
    //if click to select cancel close.
    if(e && e.target && e.target.classList.contains('hybriddd-option')) return;

    if(e2){
      if(e2.target.isSameNode(_.el)) return; //in case original element is clicked
      if(_.multi && (e2.ctrlKey || e2.shiftKey)) return; //multiple select w/ ctrl|shift key
      if(e2.target.parentNode.classList.contains('hybriddd-group')) return;
    }

    _.hdd.classList.remove('active');
    //reset the option hover index.
    if(_.hindex.length>0) _.optionClass('hover', _.hindex);
    _.hindex = [];
    //stop listening to external clicks.
    _.event(document, 'remove',{
      click: _.close
    });
    _.event(document,'remove',{
      'hybrid-dd-click':_.close
    });
    if(blur) _.blur(); //remove focus.
  }
	return HybridDropdown;
})
