/*
Hybrid Dropdown JavaScript plugin insprired from an original idea by Sandrina Pereira (twitter:@a_sandrina_p)
Version: 2.0rc1
Authors: Aurovrata Venet
Twitter: @aurovrata
GitHub: https://github.com/aurovrata/hybrid-html-dropdown

Method list:
hsProtype.init - initialise object.
hsProtype.refreshHybrid - enable object refresh once initialised, used to filter options.
hsProtype.buildOptionList - build th elist of optons to populate the dropdown.
hsProtype.event - add event listeners.
hsProtype.updateFromOriginal - update hybrid selected values from original SELECT element.
hsProtype.emit - emit events to notify of changes.
hsProtype.originalElementFocus - transfer focus to hybraid when original SELECT element receive focus.
hsProtype.blurField - change hybrid status when focus is lost.
hsProtype.nextOption - retrieve next option in dropdown list for key navigation.
hsProtype.prevOption - retrieve prev option in dropdown list for key navigation.
hsProtype.keyboardNavigate - handle keyboard navigation.
hsProtype.optionModClick - handle modifier key (shft|ctrl) + click events.
hsProtype.scroll - scroll long dropdown lists.
hsProtype.inputChange - handle change in option input field.
hsProtype.toggleValue - toggle values for multiple highlighted options.
hsProtype.addValue - add selected values to the hybrid value tracker.
hsProtype.removeValue - remove selected values to the hybrid value tracker.
hsProtype.updateOriginal - update the original SELECT element.
hsProtype.optionHover - flag optoins being hovered in multiple selection fields.
hsProtype.addClass - add class on options.
hsProtype.clearClass - remove class on options.
hsProtype.openSelect - open dropdown list.
hsProtype.closeSelect - close dropdown list.
hsProtype.colourise - seek document colours to colourise font and background.
*/
//custom error.
class HybridDDError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HybridDropdownError';
  }
}
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
      throw new HybridDDError("HybridDropdown requires a DOM element to intialise.");
    }

    let _ = this, lim=1, cb=true, tabIdx = elm.getAttribute('tabindex');
    _.isDS = false, cnfg={}; //track source

    switch(true){
      case elm.nodeName === "SELECT": //select field source.
        if(elm.multiple) lim=-1;
        elm.style="visibility:hidden"; //hide the origial select field.
        cb = false; //checkboxes
        break;
      default:
        _.isDS = true;// dateset source.
        cnfg = Object.assign({}, elm.dataset); //get any initial settings.
        try{
          cnfg['dataSet'] = JSON.parse(elm.querySelector('script').innerHTML);
        }catch(se){
          console.log(se.name+":"+se.message);
          console.log("Unable to Hybridise element, missing or malformed json dataset");
        }

        elm.classList.add('hybriddd-custom'); //flag the element as custom.
        break;
    }
    //if already instanciated, return existing object.
    if(elm._hybriddd) return elm._hybriddd;
    elm._hybriddd = _; //expose object in its original DOM element.
    _.el = elm; //keep original element reference.
    _.el.classList.add('hybridddised'); //flag the element as converted.
    // merge user setting with defaults
    Object.keys(cnfg).forEach(k=>{
      switch(k){
        case 'limitSelection':
          cnfg[k] = parseInt(cnfg[k]);
          break;
        case 'eventPropagate':
        case 'treeView':
        case 'negative':
          cnfg[k] = (cnfg[k] == 'true');
          break;
      }
    });
    _.opt = Object.assign(
      {},//initial target.
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
        treeView:false,
        fieldName: '',
        backgroundColor:'',
        color:'',
        negative: false,
        colourise: true,
        checboxes: cb,
        tabIndex:tabIdx?tabIdx:0,
        listOption: function(o,i){return true},
        selectedValues:[],
      }, //default settings.
      settings, //user settings.
      cnfg //element data attribtues.
    );
    if(_.opt.treeView && 1==_.opt.limitSelection) _.opt.limitSelection=-1; //by default
    _.multi = (_.opt.limitSelection !=1); //flag multi select field.
    //check if we have a field name.
    if(_.isDS){
      if(_.opt.fieldName.length==0) _.opt.fieldName = _.el.getAttribute('id'); //try to set it to id.
      if(_.multi && _.opt.fieldName.length>0 && _.opt.fieldName.indexOf('[]')<0) _.opt.fieldName +='[]';
    }else{
      if(_.opt.fieldName.length==0){
        switch(true){
          case _.el.hasAttribute('name'):
            _.opt.fieldName = _.el.getAttribute('name');
            break;
          case _.el.hasAttribute('id'):
            _.opt.fieldName = _.el.getAttribute('id');
            break;
        }
      }
      _.el.setAttribute('name','');
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
      _.hdd = null; //dropdown container.
      if(_.isDS){
        _.hdd=_.el;
        if(!_.el.hasAttribute('tabindex')) _.hdd.setAttribute('tabindex',_.opt.tabIndex);
      }else{
        _.hdd = document.createElement('div');
        _.el.parentNode.insertBefore(_.hdd, _.el.nextSibling);
        _.hdd.style['margin-left']='-'+_.el.getBoundingClientRect()['width']+'px';
        _.hdd.setAttribute('tabindex',_.opt.tabIndex);
      }
      // c.appendChild(_.el);
      //construct the hybrid-select.
      // _.hdd = document.createElement('div');
      // _.el.parentNode.appendChild(_.hdd);
      //hide original element.
      // _.el.style.display='none';
      _.hdd.classList.add('hybrid-dropdown');
      if(_.opt.checboxes)_.hdd.classList.add('show-cb');
      // _.hdd.setAttribute('aria-hidden', true);//hide from readers.
      _.hdd.selected = document.createElement('div');
      _.hdd.appendChild(_.hdd.selected);
      _.hdd.selected.classList.add('hybriddd-selected');
      _.hdd.ddlist = document.createElement('ul');
      _.hdd.appendChild(_.hdd.ddlist);
      _.hdd.ddlist.classList.add('hybriddd-options');
      if(!_.hdd.ddlist.style['background-color'] && _.opt.colourise) _.colourise(_.hdd.ddlist);
      _.hdd.options = {};
      _.hindex=[]; //hover indexes used to track shiftkey + drag events.
      _.sindex=[]; //initial index of selected option.
      _.value={}; //initial value.
      _.listenForBulk = false;
      _.listenModClick = false;
    }
    //set style.
    _.hdd.classList.add('hybriddd-'+_.opt.dropdown);
    //build list of options.
    let opts = null;
    if(_.isDS){
      _.hdd.classList.add('hybriddd-custom');
      if(_.opt.dataSet) opts = Object.entries(_.opt.dataSet);
      else opts = [["","<em>json error</em>"]];
    }
    else opts = _.el.children;
    try{
      opts = _.buildOptionList(opts,0);
      _.hdd.ddlist.replaceChildren(...opts);
    }catch(err){
      if(err instanceof HybridDDError){
        console.log(err.name+":"+err.message);
        _.hdd.selected.innerHTML = "<em>json error</em>";
      }else throw err;
    }

    if(init){
      //bind some events....
      if(!_.isDS){
        //listen for 'change' on the original select.
        _.event(_.el,'add',{
          change: _.updateFromOriginal.bind(_),
          focus: _.originalElementFocus.bind(_)
        });
      }
      //listen for input field changes.
      _.change = _.inputChange.bind(_);
      _.event(_.hdd.ddlist,'add',{
        change: _.change
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
      //trach hover for multi fields.
      _.hover = _.optionHover.bind(_);
      //navigate with keys.
      _.keyNav = _.keyboardNavigate.bind(_);
      //listen for spacebar/arrow keys used for navigation.
      _.event(_.hdd,'add',{
        keydown:_.keyNav
      });
      //refresh fn.
      _.refresh = _.refreshHybrid.bind(_);
      //ctril + click event handling.
      _.modClick = _.optionModClick.bind(_);
      //fire init event.
      _.emit('hybrid-dd-init');
    }
  }
  //set colour for dd elements.
  hsProtype.colourise = function(elm){
    let _ = this;
    if(_window['hdd']){
      _.opt.backgroundColor = _window.hdd.bgColor;
      _.opt.color = _window.hdd.color;
    }
    if(!_.opt.backgroundColor || !_.opt.color){
      let found=false, p=_.hdd, s;
      while(!found && p){
        s = _window.getComputedStyle( p, null);
        if(!_.opt.backgroundColor){
          switch(s['background-color']){ //bg colour;
            case 'transparent':
            case '':
            case 'rgba(0, 0, 0, 0)':
              p=p.parentElement;
              break;
            default:
              _.opt.backgroundColor = s['background-color'];
          }
        }
        if(!_.opt.color){
          switch(s['color']){ //bg colour;
            case 'transparent':
            case '':
            case 'rgba(0, 0, 0, 0)':
              p=p.parentElement;
              break;
            default:
              _.opt.color = s['color'];
          }
        }
        if(_.opt.color && _.opt.backgroundColor) found=true;
      }
      if(!found){ //set to default.
        _.opt.color = _.opt.negative ? '#5d5d5d':'#fff';
        _.opt.backgroundColor = _.opt.negative ? '#fff':'#5d5d5d';
      }else if(_.opt.negative){
        s = _.opt.color;
        _.opt.color = _.opt.backgroundColor;
        _.opt.backgroundColor = s;
      }
    }
    elm.style['background-color']= _.opt.backgroundColor;
    elm.style['color']= _.opt.color;
    if(!_window['hdd']){
      _window.hdd={
        color:elm.style['color'],
        bgColor:elm.style['background-color']
      }
      let active = document.createElement("style")
      active.type = "text/css"
      active.innerText = ".hybriddd-option.active > label:hover,.hybriddd-option.hover > label,.hybriddd-option \
      > label:hover{color: "+elm.style['background-color']+";background-color:"+elm.style['color']+"}:hover > \
      input:checked + .hybridddl > .hybridddcb::before{color:"+elm.style['color']+"} ul.hybriddd-options::-webkit-scrollbar-track {background:"+elm.style['background-color']+"} ul.hybriddd-options::-webkit-scrollbar-thumb, ul.hybriddd-options::-webkit-scrollbar {background:"+elm.style['color']+"}";
      document.head.appendChild(active);
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
       isGroup = false, isSelected = false, hasChildren = false,
       lbl, val, kids=[], icl='', checked='';
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
            icl = 'hybridddin'; //to ignore input when tabbed.
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
          checked='';
          if(isSelected){
            _.value[val] = lbl;
            _.sindex.push(val);
            checked = ' checked'
          }
          //preserve select options attributes.
          // for(let k in o.dataset) hso.dataset[k]=o.dataset[k];
          hso.setAttribute('tabindex','-1');
          hso.innerHTML = '<label class="hybriddd-l'+p+'">'+
            '<input tabindex="-1" class="'+ icl+'" type="'+ t+'" value="'+ val+ '"'+ fname+ checked+ ' />'+
            '<span class="hybridddcb"></span><span class="hybridddl">'+ lbl +'</span>' +
            '</label>';
          hso.classList.value = 'hybriddd-option' + (isSelected ? ' active':'');
          if(!_.isDS) hso.classList.value += o.classList.value; // + (o.value!=''?'hybriddd-'+o.value:'');
          //make sure not duplicate value.
          if(_.hdd.options[val]) throw new HybridDDError("Option list has duplicate value: "+val);
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
      if(_.empty()) _.reset();
      //make sure empty value does not cohabit with others.
      let vs = Object.keys(_.value);
      if( vs.length>1 && vs.indexOf('')>=0) delete _.value[''];
      _.hdd.selected.innerHTML = _.opt.selectedLabel(_.value);
    }
    return opts;
  }
  //check if values are empty.
  hsProtype.empty = function(){
    let _ = this;
    for(let k in _.value) return false;
    return true;
  }
  //reset the default value of the field.
  hsProtype.reset = function(){
    let _ = this;
    _.sindex = [];
    if(_.hdd.options['']){
      _.hdd.options[''].classList.add('active');
      _.value['']=_.hdd.options[''].querySelector('.hybridddl').innerHTML;
      _.hdd.options[''].querySelector('input').checked=true;
      _.sindex.push('');
    }else _.value[''] = _.opt.defaultText;
  }
  //method to add event listeners.
  hsProtype.event = function (ele, type, args) {
    var eventHandler = ele[type + 'EventListener'].bind(ele)
    Object.keys(args).forEach(function (k) {
      if(['mouseenter','mouseleave'].indexOf(k)>=0)   eventHandler(k, args[k],true);
      else eventHandler(k, args[k])
    })
  }
  //update from original
  hsProtype.updateFromOriginal = function(){
    let _ = this, vs=[];
    if(_.isDS) return;
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

    _.addValue(vs, false);
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
    if(!_.isDS){
      if(_.el.disabled) return;
      _.el.blur();
    }
    _.hdd.focus({preventScroll:true});
    _.hdd.classList.add('focus');
    //cancel window scrolling on space bar.
    _.event(document,'add',{
      click: _.blur
    })
  }
  //TODO: onblur, clean up window keydown event.
  hsProtype.blurField = function(){
    let _ = this;
    _.hdd.classList.remove('focus');
    // _.event(_.hdd,'remove',{
    //   keydown:_.keyNav
    // })
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
    let _ = this, e = arguments[0], v, bdl,bdi;
    if(_.el.disabled) return;
    if(e && e.keyCode){
      e.preventDefault(); //stop page scroll.
      switch(true){
        case 40==e.keyCode && 'keydown' == e.type: //down arrow.
          if(_.hdd.classList.contains('active')){ //list is open, change hover option
            if(_.hindex.length>0 && !_.multi || !e.shiftKey) _.clearClass('hover'); //toggle class
             v = _.nextOption(_.hindex);
            _.hdd.options[v].classList.add('hover');
            _.scroll(v, 'down');
            if(_.multi && e.shiftKey){
              _.hindex.push(v);
              if(_.opt.limitSelection>0) _.hindex = _.hindex.slice(-1*_.opt.limitSelection);
            }else _.hindex[0] = v;
          }else{ //change select value
            if(1==_.opt.limitSelection){ //select the next value.
              v = _.nextOption(_.sindex);
              _.toggleValue([v], true);
            }else{ //open the dropdown.
              _.hdd.classList.remove('focus');
              _.open();
            }
          }
          break;
        case 38==e.keyCode && 'keydown' == e.type: //up arrow.
          if(_.hdd.classList.contains('active')){ //list is open, change hover option
            if(_.hindex.length>0 && !_.multi || !e.shiftKey) _.clearClass('hover');
            v = _.prevOption(_.hindex);
            _.hdd.options[v].classList.add('hover');
            _.scroll(v,'up');
            if(_.multi && e.shiftKey){
              _.hindex.push(v);
              if(_.opt.limitSelection>0) _.hindex = _.hindex.slice(-1*_.opt.limitSelection);
            }else _.hindex[0] = v;
          }else{ //change select value
            if(1==_.opt.limitSelection){ //select the next value.
              let v = _.prevOption(_.sindex);
              _.toggleValue([v], true);
            }else{ //open the dropdown.
              _.hdd.classList.remove('focus');
              _.open();
            }
          }
          break;
        case 13==e.keyCode && 'keydown' == e.type: //enter.
        case 32==e.keyCode && 'keydown' == e.type: //spacebar.
          if(_.hdd.classList.contains('active') === false){//open the list.
            _.hdd.classList.remove('focus');
            _.open();
          }else{
            if(_.hindex.length>0) _.toggleValue(_.hindex, true);
            _.closeSelect(false);
            _.hdd.classList.add('focus');
          }
          break;
        case 27==e.keyCode && 'keydown' == e.type: //esc
          if(_.hdd.classList.contains('active')) _.closeSelect(false); //close list if open
          _.blurField(); //blur.
          break;
        case 9==e.keyCode && 'keydown' == e.type: //tab key, navigate to next field.
          if(_.hdd.classList.contains('active')) _.closeSelect(false); //close list if open
          _.blurField(); //blur.

          //check if field has tab index.
          let tidx = _.el.getAttribute('tabindex')*1.0,
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
                next._hybriddd.originalElementFocus();
                break;
              case next.type === 'text':
                next.select();
                break;
              default:
                next.focus();
                break;
            }
          }
          break;
        case 16==e.keyCode && 'keydown' == e.type: //shift.
          if(_.multi && _.hdd.classList.contains('active')){
            //listen for drag event.
            let o = e.originalTarget;
            if(!o) o = e.target;
            if(!o.classList.contains('hybriddd-option')) o = o.closest('.hybriddd-option');
            if(o)_.hindex = [o.querySelector('input').value];
            if(!_.listenForBulk){
              _.event(_.hdd.ddlist,'add',{
                mouseenter:_.hover,
                mouseleave:_.hover,
                click:_.modClick,
                'hybrid-ddi-change':_.change
              });
              _.listenForBulk = true;
              _.listenModClick = true;
            }
          }
          break;
        case 16==e.keyCode && 'keyup' == e.type:
          if(_.listenForBulk){
            _.event(_.hdd.ddlist,'remove',{
              mouseenter:_.hover,
              mouseleave:_.hover,
              click:_.modClick,
              'hybrid-ddi-change':_.change
            });
            _.listenForBulk = false;
            _.listenModClick = false;
          }
          break;
        case 17==e.keyCode && 'keydown' == e.type: //ctrl.
          if(!_.listenModClick && _.multi){
            _.event(_.hdd.ddlist,'add',{
              click:_.modClick,
              'hybrid-ddi-change':_.change
            });
            _.listenModClick = true;
          }
          break;
        case 17==e.keyCode && 'keyup' == e.type: //ctrl.
          if(_.listenModClick){
            _.event(_.hdd.ddlist,'remove',{
              click:_.modClick,
              'hybrid-ddi-change':_.change
            });
            _.listenModClick = false;
          }
          break;
      }
    }
  }
  //listen for ctrl|shift + click on multiple dropdown.
  hsProtype.optionModClick = function(e){
    let _ = this, o, i;
    if(e && e.target){ //target only label clicks as they both register on webkit + gekho engines.
      if(!e.ctrlKey && !e.shiftKey){ //ctrl keyup  does not fire after a ctrl+click.
        if(_.listenModClick){
          _.event(_.hdd.ddlist,'remove',{
            click:_.modClick,
            'hybrid-ddi-change':_.change
          });
          _.listenModClick = false;
        }
        if(_.listenForBulk){
          _.event(_.hdd.ddlist,'remove',{
            mouseenter:_.hover,
            mouseleave:_.hover,
          });
          _.listenForBulk = false;
        }
        return;
      }
      o = e.target.closest('.hybriddd-option');
      if(o){
        i = o.querySelector('input');
        i.checked = (!i.checked);
        i.dispatchEvent(new Event('hybrid-ddi-change', { 'bubbles': true}));
        i.classList.add('mod-ctrl');
      }
    }
  }
  //scroll items into view.
  hsProtype.scroll = function(v,dir='up'){
    let _ = this, i = _.hdd.options[v].querySelector('label'),
    bdi = i.getBoundingClientRect(),
    bdl = _.hdd.ddlist.getBoundingClientRect();
    if(bdi.top < bdl.top || bdi.bottom > bdl.bottom){
      switch(dir){
        case 'up':
          if(bdl.top > bdi.top) _.hdd.ddlist.scrollTop -= bdi.height;
          else if(bdl.bottom < bdi.bottom) _.hdd.ddlist.scrollTop=bdi.bottom - bdl.bottom;
          break;
        case 'down':
          if(bdl.bottom < bdi.bottom) _.hdd.ddlist.scrollTop += bdi.height;
          else if(bdl.top > bdi.top) _.hdd.ddlist.scrollTop=0;
          break;
      }
    }
  }
  //options input changed.
  hsProtype.inputChange = function(){
    let _ = this, e = arguments[0], v=[], isCtrl = false;
    if(e && e.target){
      isCtrl = e.target.classList.contains('mod-ctrl');
      if('change'==e.type && isCtrl){
        e.target.classList.remove('mod-ctrl')
        return false;
      }
      if(_.hindex.length>0) v = [..._.hindex]; //shift + scroll.

      if(e.target.checked && ''==e.target.value){ //clear values.
        if(!isCtrl) _.removeValue([..._.sindex]); //use array copy else buggy.
      }else if(_.opt.treeView && (_.opt.limitSelection < 0 || _.opt.limitSelection > _.sindex.length)){
        //toggle all children
        let ai,
          i,
          start = true,
          pl = e.target.closest('.hybriddd-option'),
          ci = pl.querySelectorAll("input");

        for (i of ci.values()) {
          i.checked = e.target.checked;
          if(!isCtrl){
            if(e.target.checked) v.push(i.value);
            else _.removeValue([i.value]);
          }
          i.closest('.hybriddd-option').classList.remove("partial");
        }

        //check parent branch.
        while (pl) {
          i = pl.querySelector("input");
          if (!start && !i.checked &&
            (pl.querySelectorAll("label input").length - pl.querySelectorAll("label input:checked").length)==1
          ) {
            i.checked = true;
            v.push(i.value);
            pl.classList.remove("partial");
          }
          ci = pl.querySelectorAll("input:checked");
          ai = pl.querySelectorAll("input");
          if (i.checked && ci.length == 1 && ai.length > 1) {
            //special case, all children unchecked.
            pl.classList.remove("partial");
            i.checked = false;
            if(!isCtrl) _.removeValue([i.value]);
          } else if (ci.length > 0 && ai.length != ci.length) {
            pl.classList.add("partial");
            if(!isCtrl) _.removeValue([i.value]);
          } else pl.classList.remove("partial");
          pl = pl.parentNode.closest('.hybriddd-option');
          start = false;
        }
        if(!isCtrl) _.addValue(v);
      }else{ //just add the current value.
        if(!isCtrl) {
          v.push(e.target.value);
          if(e.target.checked) _.addValue(v);
          else _.removeValue(v);
        }
      }
      switch(true){
        case 'hybrid-ddi-change'== e.type:
        case e.shiftKey && e.shiftKey==true:
          break;
        default:
          _.closeSelect(false);
          break;
      }
    }
  }
  //toggle values that are hoghlighted.
  hsProtype.toggleValue = function(varr, emit){
    let _ = this;
    //for now simply add/remove based on first value.
    if(_.hdd.options[varr[0]].querySelector('input').checked) _.removeValue(varr, emit);
    else _.addValue(varr, emit);
  }
  //add value.
  hsProtype.addValue = function(varr, emit=false){
    let _ = this;
    switch(_.opt.limitSelection){
      case 1:
        _.hdd.options[_.sindex[0]].classList.remove('active');
        _.sindex=varr;
        break;
      default:
        if(_.sindex.length==1 && _.sindex[0].length==0){
          _.hdd.options[''].classList.remove('active');
          _.hdd.options[''].querySelector('input').checked=false;
          _.sindex=varr;
        }else _.sindex = _.sindex.concat(varr);
        if(_.opt.limitSelection>0){
          for(let j = _.opt.limitSelection; j<_.sindex.length;j++){
            _.hdd.options[_.sindex[j]].querySelector('input').checked=false;
          }
          _.sindex = _.sindex.slice(0,_.opt.limitSelection);
        }
        _.clearClass('hover');
        _.hindex=[];
        break;
    }
    _.value={};
    _.sindex.forEach(v=>{
      _.value[v]=_.hdd.options[v].querySelector('.hybridddl').innerHTML;
      _.hdd.options[v].querySelector('input').checked=true;
      _.hdd.options[v].classList.add('active');
    });
    if(_.empty()) _.reset();
    if(!_.isDS) _.updateOriginal();
    //update selected value label.
    _.hdd.selected.innerHTML = _.opt.selectedLabel(_.value);
    if(emit) _.emit('change');
  }
  //remove value.
  hsProtype.removeValue = function(varr, emit=false){
    let _ = this,idx;
    varr.forEach(v=>{
      _.hdd.options[v].classList.remove('active');
      _.hdd.options[v].querySelector('input').checked=false;
      idx = _.sindex.indexOf(v);
      if(idx >=0){
        _.sindex.splice(idx,1);
        delete _.value[v];
      }
    });
    if(_.sindex.length==0){ //reset to default.
      if('undefined' != typeof _.hdd.options['']){
        _.sindex=[''];
        _.value={'':_.hdd.options[''].querySelector('.hybridddl').innerHTML};
        _.hdd.options[''].querySelector('input').checked=true;
        _.hdd.options[''].classList.add('active');
      }else _.value={'': _.opt.defaultText};
    }
    if(_.empty()) _.reset();
    if(!_.isDS) _.updateOriginal();
    _.hdd.selected.innerHTML = _.opt.selectedLabel(_.value);
    if(emit) _.emit('change');
  }
  //method to update the hybrid select value.
  hsProtype.updateOriginal = function(){
    let _ = this;
    Object.keys(_.value).forEach(v=>{
      _.el.selectedIndex = -1;
      _.el.querySelector('option[value="'+v+'"]').selected=true;
    });
  }
  //function to flag options being hovered.
  hsProtype.optionHover = function(){
    let _ = this, v, o,
      e = arguments[0];
    if(!e.shiftKey){
      if(_.hindex.length>0){
        _.clearClass('hover');
        _.hindex=[];
      }
      return; //track shift mouseenter events only.
    }
    if(e.target.classList.contains('hybriddd-option')) o = e.target;
    else o= e.target.closest('.hybriddd-option');
    if(o) {
      v = o.querySelector('input').value;
      switch(e.type){
        case 'mouseleave':
          _.event(_.hdd.ddlist, 'remove',{
            mouseleave: _.hover
          });
          if(v) _.hindex=[v];
          break;
        case 'mouseenter':
          if(_.hindex.includes(v)){
            v =_.hindex[(_.hindex.length-1)]; //toggle last inserted idx.
            _.hindex =_.hindex.slice(0,-1);
          }else if(v) _.hindex.push(v);
          if(_.opt.limitSelection>0) _.hindex = _.hindex.slice(0,_.opt.limitSelection);
          break;
      }
      if(v && !_.sindex.includes(v)) _.hdd.options[v].classList.add('hover');
    }
  }
  //clear class from option.
  hsProtype.clearClass = function(cl){
    let _ = this;
    if('string' == typeof cl && cl.length>0){
      _.hdd.querySelectorAll('.'+cl).forEach(o=>{
        o.classList.remove(cl)
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
    if(!_.hdd.ddlist.style['min-width']) _.hdd.ddlist.style['min-width']=(_.hdd.ddlist.offsetWidth + 12)+"px";

    //listen for external clicks to close.
    _.event(document, 'add',{
      click: _.close
    });
    //listen for keyup navigation (ctrl/shift key)
    _.event(_.hdd,'add',{
      keyup:_.keyNav
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
      if(e2.target.parentNode.classList && e2.target.parentNode.classList.contains('hybriddd-group')) return;
      if(e2.target.closest('.hybriddd-option')) return;
    }

    _.hdd.classList.remove('active');
    //reset the option hover index.
    _.clearClass('hover');
    _.hindex = [];
    //stop listening to external clicks.
    _.event(document, 'remove',{
      click: _.close
    });
    _.event(document,'remove',{
      'hybrid-dd-click':_.close
    });
    _.event(_.hdd,'remove',{
      keyup:_.keyNav
    });
    //stop listening for option list mouseenter.
    if(_.listenForBulk){
      _.event(_.hdd.ddlist, 'remove',{
        mouseenter: _.hover
      });
      _.listenForBulk = false;
    }
    if(blur) _.blur(); //remove focus.
  }

	return HybridDropdown;
})
