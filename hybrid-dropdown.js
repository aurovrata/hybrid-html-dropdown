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
	let HybridDropdown = (_window.HybridDropdown = function (element, settings) {
    //verify we have an element.
    if(typeof element === 'undefined'){
      throw new Error("Cannot initialise HybridDropdown object with null element.");
    }
		if(element.nodeName !== "SELECT") {
      throw new Error("Attempting to convert element "+element.nodeName+" into HybridDropdown object.");
    }

    let _ = this, lim=1;
    //if already instanciated, return existing object.
    if(element._hybriddd) return element._hybriddd;

    element._hybriddd = _; //expose object in its original DOM element.

    _.el = element; //keep original element reference.
    if(_.el.multiple) lim=-1;
    _.el.style="font-size:16px";
    _.el.classList.add('hybriddd'); //flag the element as converted.

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
        listOption: function(o){return true},
      }, //default settings.
      settings //user settings.
    );
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
      let c = document.createElement('div');
      _.el.parentNode.insertBefore(c, _.el.nextSibling);
      c.appendChild(_.el);
      //construct the hybrid-select.
      _.hdd = document.createElement('div');
      _.el.parentNode.appendChild(_.hdd);
      _.hdd.classList.add('hybriddd-js')
      _.hdd.setAttribute('aria-hidden', true);//hide from readers.
      _.hdd.selected = document.createElement('div');
      _.hdd.appendChild(_.hdd.selected);
      _.hdd.selected.classList.add('hybriddd-selected');
      _.hdd.options = document.createElement('div');
      _.hdd.appendChild(_.hdd.options);
      _.hdd.options.classList.add('hybriddd-options');
      _.hindex = [-1]; //initial option hover index.
      _.sindex = []; //initial index of selected option.
      _.value = {}; //initial value.
    }
    //set style.
    _.el.parentElement.classList.value='hybriddd-container hybriddd-'+_.opt.dropdown;

    //build list of options.
    let opts = _.extractOptions(_.el.children);
    _.hdd.options.replaceChildren(...opts);

    if(init){
      //bind some events....
      //listen for 'change' on the original select.
      _.event(_.el,'add',{
        change: _.updateFromOriginal.bind(_),
        focus: _.focus.bind(_)
      });
      let getOption = _.optionsSelected.bind(_);
      _.event(_.hdd.options,'add',{
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
  hsProtype.extractOptions = function(list,opts=[]){
    let _ = this, defhso, idx=opts.length;
    [].forEach.call(list,(o,i) => {
      //TODO: check if o is optgrp, and loop over.
      if(_.opt.listOption(o,i+idx) !== true) return;
      let hso = document.createElement('div');
      switch(o.nodeName){
        case 'OPTGROUP':
          hso.innerHTML =_.opt.optionLabel(o.label);
          hso.classList.add('hybriddd-group');
          opts[opts.length] = hso;
          // opts = opts.concat(_.extractOptions(o.children, opts));
          _.extractOptions(o.children, opts);
          break;
        default:
          //preserve select options attributes.
          // for(let k in o.dataset) hso.dataset[k]=o.dataset[k];
          hso.dataset.hsoValue=o.value;
          hso.innerHTML =_.opt.optionLabel(o.text);
          hso.classList = o.classList;
          hso.classList.add('hybriddd-option');
          if(o.selected===true || (i+idx)==0){
            if(i>0 && typeof _.value[''] != 'undefined'){
              opts[0].classList.remove('active');
              _.value={}; //default value no longer selected.
              _.sindex=[];
            }
            if(!_.el.multiple){
              _.value={[o.value]:hso.innerHTML};
              _.sindex = [(i+idx)]; //keep track of selected value.
            }else{
              _.sindex.push((i+idx));
              _.value[o.value] = hso.innerHTML;
            }
            _.hdd.selected.innerHTML = _.opt.selectedLabel(_.value);
            hso.classList.add('active');
          }
          if(''==o.value) defhso = hso;
          //if(init)_.hdd.options.appendChild(hso);
          // else
          // opts.appendChild(hso);
          opts[opts.length] = hso;
          break;
      }
    });
    if(0==_.value.length){
      if(defhso){
        _.value = {[defhso.dataset.hsoValue]: defhso.innnerHTML};
        _.opt.selectedLabel(_.value);
      }else _.opt.selectedLabel({'':_.opt.defaultText});
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
      idx = idxs[0];
    switch(_.opt.limitSelection){
      case 1: //default
        if(_.sindex.length>0) _.optionClass('active', _.sindex);
        _.sindex[0] = idx;
        _.value={};
        _.hdd.options.children[idx].classList.add('active');
        //update values.
        _.el.value = _.hdd.options.children[idx].dataset.hsoValue;
        _.value[_.el.value] = _.hdd.options.children[idx].innerHTML;
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
        _.sindex.forEach(i=>{
          let v = _.hdd.options.children[i].dataset.hsoValue;
          _.hdd.options.children[i].classList.add('active');
          _.value[v]=_.hdd.options.children[i].innerHTML;
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
    let _ = this;
    if(_.el.multiple){
      let skipUpdate = true;
      for(let i=0; i<_.el.selectedOptions.length; i++){
        if(!(_.el.selectedOptions.item(i).value in _.value) ) skipUpdate=false;
      }
      if(skipUpdate) return;
    }else if(_.el.value in _.value) return; //not need to update.
    let sel = _.hdd.options.querySelector(`.hybriddd-option[data-hso-value="${_.el.value}"`);
    sel = [..._.hdd.options.children].indexOf(sel); //index in hybrid.
    _.updateSelection([sel], false);
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
  hsProtype.focus = function(){
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
  hsProtype.nextHybridOption = function(cur){
    let _ = this, next = cur[cur.length-1]+1;
    if(next < _.hdd.options.childElementCount && !_.hdd.options.children[next].classList.contains('hybriddd-option')){
      next++;
    }
    if(next === _.hdd.options.childElementCount){ //end of list.
      next=0;
      if(!_.hdd.options.children[next].classList.contains('hybriddd-option')) next++;
    }
    return next;
  }
  //find prev option.
  hsProtype.prevHybridOption = function(cur){
    let _ = this, prev = cur[0]-1;
    if(prev > 0 && !_.hdd.options.children[prev].classList.contains('hybriddd-option')){
      prev--;
    }
    if(prev < 0){ //end of list.
      prev =_.hdd.options.childElementCount-1;
      if(!_.hdd.options.children[prev].classList.contains('hybriddd-option')) prev--;
    }
    return prev;
  }
  //key navigation.
  hsProtype.keyboardNavigate = function(){
    let _ = this, e = arguments[0];
    if(e && e.keyCode){
      e.preventDefault(); //stop page scroll.
      switch(e.keyCode){
        case 40: //down arrow.
          if(_.hdd.classList.contains('active')){ //list is open, change hover option
            if(_.hindex[0]>=0 && !_.el.multiple && !e.shiftKey) _.optionClass('hover', _.hindex); //toggle class
            let idx = _.nextHybridOption(_.hindex);
            _.hdd.options.children[idx].classList.add('hover');
            if(_.el.multiple && e.shiftKey){
              _.hindex.push(idx);
              if(_.opt.limitSelection>0) _.hindex = _.hindex.slice(-1*_.opt.limitSelection);
            }else _.hindex[0] = idx;
          }else{ //change select value
            if(1==_.opt.limitSelection){ //select the next value.
              let idx = _.nextHybridOption(_.sindex);
              _.updateSelection([idx], true);
            }else{ //open the dropdown.
              _.hdd.classList.remove('focus');
              _.open();
            }
          }
          break;
        case 38: //up arrow.
          if(_.hdd.classList.contains('active')){ //list is open, change hover option
            if(_.hindex[0]>=0 && !_.el.multiple && !e.shiftKey) _.optionClass('hover', _.hindex);
            let idx = _.prevHybridOption(_.hindex);
            _.hdd.options.children[idx].classList.add('hover');
            if(_.el.multiple && e.shiftKey){
              _.hindex.push(idx);
              if(_.opt.limitSelection>0) _.hindex = _.hindex.slice(-1*_.opt.limitSelection);
            }else _.hindex[0] = idx;
          }else{ //change select value
            if(1==_.opt.limitSelection){ //select the next value.
              let idx = _.prevHybridOption(_.sindex);
              _.updateSelection([idx], true);
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
            form = _.el.form,
            next ;

          if(form === null) form = document;
          if(tidx != null && tidx != ''){
            tidx +=1;
            next = form.querySelector(':input[tabindex='+tidx+']');
          }else{ //find current field sibling.
            for(tidx in _.el.form.elements){
              if(_.el.form.elements[tidx] === _.el){
                tidx++;
                if(_.el.form.elements.length==tidx) tidx=0;
                next = _.el.form.elements[tidx];
                break;
              }
            }
          }
          if(null!=next){
            next.focus();
            if(next.type === 'text') next.select();
          }
      }
    }
  }
  //options selected.
  hsProtype.optionsSelected = function(){
    let _ = this, e = arguments[0];
    if(e && e.target){
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
    let _ = this, e = arguments[0];
    if(e && e.target && e.target.classList.contains('hybriddd-option')) {
      if(_.hindex[0]>=0 && !e.shiftKey) _.optionClass('hover',_.hindex);
      let idx = [..._.hdd.options.children].indexOf(e.target);
      if(_.el.multiple && e.shiftKey){
        if(_.hindex.includes(idx)){
          idx=_.hindex[(_.hindex.length-1)]; //toggle last inserted idx.
          _.hindex=_.hindex.slice(0,-1);
        }else _.hindex.push(idx);
        if(_.opt.limitSelection>0) _.hindex = _.hindex.slice(0,_.opt.limitSelection);
      }else _.hindex = [idx];

      _.optionClass('hover',[idx]);
    }
  }
  //toggle class on option.
  hsProtype.optionClass = function(cl, idxs=[]){
    let _ = this;
    if('string' == typeof cl && cl.length>0){
      idxs.forEach(i=>{
        _.hdd.options.children[i].classList.toggle(cl);
      })
    }
  }
  //open hybrid dropdown.
  hsProtype.openSelect = function(){
    let _= this, e = arguments[0];
    if(_.el.disabled) return;
    if(e && e.target){ //triggered by event?
      if(e.target.classList.contains('hybriddd-selected')==false && e.target.closest('.hybriddd-selected') === null){
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
    _.event(_.hdd.options,'add',{
      mouseenter: _.optionHover.bind(_)
    });
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
      if(_.el.multiple && (e2.ctrlKey || e2.shiftKey)) return; //multiple select w/ ctrl|shift key
    }

    _.hdd.classList.remove('active');
    //reset the option hover index.
    if(_.hindex[0]>=0) _.optionClass('hover', _.hindex);
    _.hindex = [-1];
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
