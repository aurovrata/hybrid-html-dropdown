(function(factory){typeof define==='function'&&define.amd?define(factory):typeof exports==='object'?(module.exports=factory()):factory()})(function(){let _window=typeof window!=='undefined'?window:this;let HybridDropdown=(_window.HybridDropdown=function(elm,settings){if(!elm||!(elm instanceof Element)){throw new Error("HybridDropdown requires a DOM element to intialise.");};let _=this,lim=1,tabIdx=elm.getAttribute('tabindex');_.isDS=false,cnfg={};switch(true){case elm.nodeName==="SELECT":if(elm.multiple)lim=-1;elm.style="width:1px;height:1px";break;default:_.isDS=true;cnfg=Object.assign({},elm.dataset);try{cnfg['dataSet']=JSON.parse(elm.querySelector('script').innerHTML);}catch(se){console.log(se);console.log("Unable to Hybridise element, missing or malformed json dataset");};elm.classList.add('hybriddd-custom');break;};if(elm._hybriddd)return elm._hybriddd;elm._hybriddd=_;_.el=elm;_.el.classList.add('hybridddised');Object.keys(cnfg).forEach(k=>{switch(k){case'limitSelection':cnfg[k]=parseInt(cnfg[k]);break;case'eventPropagate':case'treeView':cnfg[k]=(cnfg[k]=='true');break;}});_.opt=Object.assign({},{eventPropagate:true,dropdown:'vertical',limitSelection:lim,optionLabel:function(label){return'<span>'+label+'</span>';},selectedLabel:function(s){let k=Object.keys(s);return s[k[0]]+((k.length>1)?'<span>[...]</span>':'');},defaultText:'---',treeView:false,fieldName:'',tabIndex:tabIdx?tabIdx:0,listOption:function(o,i){return true},selectedValues:[],},settings,cnfg);_.multi=(_.opt.limitSelection!=1);if(_.isDS){if(_.opt.fieldName.length==0)_.opt.fieldName=_.el.getAttribute('id');if(_.multi&&_.opt.fieldName.length>0&&_.opt.fieldName.indexOf('[]')<0)_.opt.fieldName+='[]';}else{if(_.opt.fieldName.length==0)_.opt.fieldName=_.el.getAttribute('name');_.el.setAttribute('name','');};_.init(true);return _;});let hsProtype=HybridDropdown.prototype;hsProtype.init=function(init){let _=this;if(init){_.hdd=null;if(_.isDS){_.hdd=_.el;if(!_.el.hasAttribute('tabindex'))_.hdd.setAttribute('tabindex',_.opt.tabIndex);}else{_.hdd=document.createElement('div');_.el.parentNode.insertBefore(_.hdd,_.el.nextSibling);_.hdd.style['margin-left']='-'+_.el.getBoundingClientRect()['width']+'px';_.hdd.setAttribute('tabindex',_.opt.tabIndex);};_.hdd.classList.add('hybrid-dropdown');_.hdd.selected=document.createElement('div');_.hdd.appendChild(_.hdd.selected);_.hdd.selected.classList.add('hybriddd-selected');_.hdd.ddlist=document.createElement('ul');_.hdd.appendChild(_.hdd.ddlist);_.hdd.ddlist.classList.add('hybriddd-options');_.hdd.options={};_.hindex=[];_.sindex=[];_.value={};_.listenForBulk=false;_.listenModClick=false;};_.hdd.classList.add('hybriddd-'+_.opt.dropdown);let opts=null;if(_.isDS){_.hdd.classList.add('hybriddd-custom');opts=Object.entries(_.opt.dataSet);};else opts=_.el.children;opts=_.buildOptionList(opts,0);_.hdd.ddlist.replaceChildren(...opts);if(init){if(!_.isDS){_.event(_.el,'add',{change:_.updateFromOriginal.bind(_),focus:_.originalElementFocus.bind(_)});};_.change=_.inputChange.bind(_);_.event(_.hdd.ddlist,'add',{change:_.change});_.open=_.openSelect.bind(_);_.event(_.hdd,'add',{click:_.open});_.close=_.closeSelect.bind(_,true);_.blur=_.blurField.bind(_);_.hover=_.optionHover.bind(_);_.keyNav=_.keyboardNavigate.bind(_);_.event(_.hdd,'add',{keydown:_.keyNav});_.refresh=_.refreshHybrid.bind(_);_.modClick=_.optionModClick.bind(_);_.emit('hybrid-dd-init');}};hsProtype.refreshHybrid=function(settings={}){let _=this;_.opt=Object.assign({},_.opt,settings);_.init(false);};hsProtype.buildOptionList=function(list,p){let _=this,opts=[],t=(_.multi)?'checkbox':'radio',fname=(_.opt.fieldName.length>0?' name="'+_.opt.fieldName+'"':'');[].forEach.call(list,(o,i)=>{if(_.opt.listOption(o,i)!==true)return;let hso=document.createElement('li'),isGroup=false,isSelected=false,hasChildren=false,lbl,val,kids=[],icl='',checked='';if(_.isDS){lbl=o[0];val=null;switch(true){case typeof o[1]==='object':hasChildren=isGroup=true;if('undefined'!=typeof o[1]['label']){val=o[0];lbl=o[1]['label'];kids=Object.entries(o[1]).slice(1);isGroup=false;}else kids=Object.entries(o[1]);break;default:icl='hybridddis';val=o[0];lbl=o[1];isSelected=_.opt.selectedValues.indexOf(val)>=0;}}else{switch(o.nodeName){case'OPTGROUP':hasChildren=isGroup=true;lbl=o.label;kids=o.children;break;default:icl='hybridddin';lbl=o.text;val=o.value;isSelected=o.selected;}};switch(isGroup){case true:hso.innerHTML='<span>'+lbl+'</span>';hso.classList.add('hybriddd-group');break;default:checked='';if(isSelected){_.value[val]=lbl;_.sindex.push(val);checked=' checked'};hso.setAttribute('tabindex','-1');hso.innerHTML='<label class="hybriddd-l'+p+'">'+'<input tabindex="-1" class="'+icl+'" type="'+t+'" value="'+val+'"'+fname+checked+' />'+'<span class="hybridddl"><span class="hybridddcb"></span>'+lbl+'</span>'+'</label>';hso.classList.value='hybriddd-option'+(isSelected?' active':'');if(!_.isDS)hso.classList.value+=o.classList.value;_.hdd.options[val]=hso;break;};if(hasChildren){let cos=_.buildOptionList(kids,p+1),ul=document.createElement('ul');ul.replaceChildren(...cos);hso.appendChild(ul);};opts[opts.length]=hso;});if(0==p){if(_.empty())_.reset();let vs=Object.keys(_.value);if(vs.length>1&&vs.indexOf('')>=0)delete _.value[''];_.hdd.selected.innerHTML=_.opt.selectedLabel(_.value);};return opts;};hsProtype.empty=function(){let _=this;for(let k in _.value)return false;return true;};hsProtype.reset=function(){let _=this;_.sindex=[];if(_.hdd.options['']){_.hdd.options[''].classList.add('active');_.value['']=_.hdd.options[''].querySelector('label').innerText;_.hdd.options[''].querySelector('input').checked=true;_.sindex.push('');}else _.value['']=_.opt.defaultText;};hsProtype.event=function(ele,type,args){var eventHandler=ele[type+'EventListener'].bind(ele);Object.keys(args).forEach(function(k){if(['mouseenter','mouseleave'].indexOf(k)>=0)eventHandler(k,args[k],true);else eventHandler(k,args[k])})};hsProtype.updateFromOriginal=function(){let _=this,vs=[];if(_.isDS)return;if(_.multi){let skipUpdate=true;for(let i=0;i<_.el.selectedOptions.length;i++){if(!(_.el.selectedOptions.item(i).value in _.value)){vs.push(_.el.selectedOptions.item(i).value);skipUpdate=false;}};if(skipUpdate)return;}else if(_.el.value in _.value)return;else vs.push(_.el.value);_.addValue(vs,false);};hsProtype.emit=function(name,arg){let _=this,e=new _window.CustomEvent(name,{bubbles:true,detail:arg});_.el.dispatchEvent(e)};hsProtype.originalElementFocus=function(){let _=this;if(!_.isDS){if(_.el.disabled)return;_.el.blur();};_.hdd.focus({preventScroll:true});_.hdd.classList.add('focus');_.event(document,'add',{click:_.blur})};hsProtype.blurField=function(){let _=this;_.hdd.classList.remove('focus');};hsProtype.nextOption=function(cur){let _=this,keys=Object.keys(_.hdd.options),next=(cur.length>0?keys.indexOf(cur[cur.length-1]):-1);if(next<keys.length)next++;if(next===keys.length)next=0;return keys[next];};hsProtype.prevOption=function(cur){let _=this,keys=Object.keys(_.hdd.options),prev=(cur.length>0?keys.indexOf(cur[0]):keys.length);if(prev>=0)prev--;if(prev<0)prev=keys.length-1;return keys[prev];};hsProtype.keyboardNavigate=function(){let _=this,e=arguments[0],v,bdl,bdi;if(_.el.disabled)return;if(e&&e.keyCode){e.preventDefault();switch(true){case 40==e.keyCode&&'keydown'==e.type:if(_.hdd.classList.contains('active')){if(_.hindex.length>0&&!_.multi||!e.shiftKey)_.clearClass('hover');v=_.nextOption(_.hindex);_.hdd.options[v].classList.add('hover');_.scroll(v,'down');if(_.multi&&e.shiftKey){_.hindex.push(v);if(_.opt.limitSelection>0)_.hindex=_.hindex.slice(-1*_.opt.limitSelection);}else _.hindex[0]=v;}else{if(1==_.opt.limitSelection){v=_.nextOption(_.sindex);_.toggleValue([v],true);}else{_.hdd.classList.remove('focus');_.open();}};break;case 38==e.keyCode&&'keydown'==e.type:if(_.hdd.classList.contains('active')){if(_.hindex.length>0&&!_.multi||!e.shiftKey)_.clearClass('hover');v=_.prevOption(_.hindex);_.hdd.options[v].classList.add('hover');_.scroll(v,'up');if(_.multi&&e.shiftKey){_.hindex.push(v);if(_.opt.limitSelection>0)_.hindex=_.hindex.slice(-1*_.opt.limitSelection);}else _.hindex[0]=v;}else{if(1==_.opt.limitSelection){let v=_.prevOption(_.sindex);_.toggleValue([v],true);}else{_.hdd.classList.remove('focus');_.open();}};break;case 13==e.keyCode&&'keydown'==e.type:case 32==e.keyCode&&'keydown'==e.type:if(_.hdd.classList.contains('active')===false){_.hdd.classList.remove('focus');_.open();}else{if(_.hindex.length>0)_.toggleValue(_.hindex,true);_.closeSelect(false);_.hdd.classList.add('focus');};break;case 27==e.keyCode&&'keydown'==e.type:if(_.hdd.classList.contains('active'))_.closeSelect(false);_.blurField();break;case 9==e.keyCode&&'keydown'==e.type:if(_.hdd.classList.contains('active'))_.closeSelect(false);_.blurField();let tidx=_.el.getAttribute('tabindex')*1.0,form=_.el.closest('form'),next,cur;if(form===null)form=document;if(tidx!=null&&tidx!=''){tidx+=1;next=form.querySelector('[tabindex="'+tidx+'"]');}else if(form!==document){cur=_.el;if(_.isDS){cur=Object.keys(_.hdd.options);tidx=cur[cur.length-1];cur=_.hdd.options[tidx].querySelector('input');};for(tidx in form.elements){if(form.elements[tidx]!==cur)continue;do{tidx++}while(tidx<form.elements.length&&form.elements[tidx].classList.contains('hybridddin'));if(form.elements.length==tidx)tidx=0;if(form.elements[tidx].classList.contains('hybridddis')){next=form.elements[tidx].closest('.hybriddd-custom');}else{next=form.elements[tidx];};break;}};if(null!=next){switch(true){case next.classList.contains('hybriddd-custom'):next._hybriddd.originalElementFocus();break;case next.type==='text':next.select();break;default:next.focus();break;}};break;case 16==e.keyCode&&'keydown'==e.type:if(_.multi&&_.hdd.classList.contains('active')){let o=e.originalTarget;if(!o.classList.contains('hybriddd-option'))o=o.closest('.hybriddd-option');if(o)_.hindex=[o.querySelector('input').value];if(!_.listenForBulk){_.event(_.hdd.ddlist,'add',{mouseenter:_.hover,mouseleave:_.hover,click:_.modClick,'hybrid-ddi-change':_.change});_.listenForBulk=true;_.listenModClick=true;}};break;case 16==e.keyCode&&'keyup'==e.type:if(_.listenForBulk){_.event(_.hdd.ddlist,'remove',{mouseenter:_.hover,mouseleave:_.hover,click:_.modClick,'hybrid-ddi-change':_.change});_.listenForBulk=false;_.listenModClick=false;};break;case 17==e.keyCode&&'keydown'==e.type:if(!_.listenModClick&&_.multi){_.event(_.hdd.ddlist,'add',{click:_.modClick,'hybrid-ddi-change':_.change});_.listenModClick=true;};break;case 17==e.keyCode&&'keyup'==e.type:if(_.listenModClick){_.event(_.hdd.ddlist,'remove',{click:_.modClick,'hybrid-ddi-change':_.change});_.listenModClick=false;};break;}}};hsProtype.optionModClick=function(e){let _=this,o,i;if(e&&e.target){if(!e.ctrlKey&&!e.shiftKey){if(_.listenModClick){_.event(_.hdd.ddlist,'remove',{click:_.modClick,'hybrid-ddi-change':_.change});_.listenModClick=false;};if(_.listenForBulk){_.event(_.hdd.ddlist,'remove',{mouseenter:_.hover,mouseleave:_.hover,});_.listenForBulk=false;};return;};o=e.target.closest('.hybriddd-option');if(o){i=o.querySelector('input');i.checked=(!i.checked);i.dispatchEvent(new Event('hybrid-ddi-change',{'bubbles':true}));}}};hsProtype.scroll=function(v,dir='up'){let _=this,i=_.hdd.options[v].querySelector('label'),bdi=i.getBoundingClientRect(),bdl=_.hdd.ddlist.getBoundingClientRect();if(bdi.top<bdl.top||bdi.bottom>bdl.bottom){switch(dir){case'up':if(bdl.top>bdi.top)_.hdd.ddlist.scrollTop-=bdi.height;else if(bdl.bottom<bdi.bottom)_.hdd.ddlist.scrollTop=bdi.bottom-bdl.bottom;break;case'down':if(bdl.bottom<bdi.bottom)_.hdd.ddlist.scrollTop+=bdi.height;else if(bdl.top>bdi.top)_.hdd.ddlist.scrollTop=0;break;}}};hsProtype.inputChange=function(){let _=this,e=arguments[0],v=[];if(e&&e.target){if(_.hindex.length>0)v=[..._.hindex];if(e.target.checked&&''==e.target.value){_.removeValue([..._.sindex]);}else if(_.opt.treeView&&_.opt.limitSelection>_.sindex.length){let ai,i,start=true,pl=e.target.closest('.hybriddd-option'),ci=pl.querySelectorAll("input");for(i of ci.values()){i.checked=e.target.checked;if(e.target.checked)v.push(i.value);else _.removeValue([i.value]);i.closest('.hybriddd-option').classList.remove("partial");};while(pl){i=pl.querySelector("input");if(!start&&!i.checked&&(pl.querySelectorAll("label input").length-pl.querySelectorAll("label input:checked").length)==1){i.checked=true;v.push(i.value);pl.classList.remove("partial");};ci=pl.querySelectorAll("input:checked");ai=pl.querySelectorAll("input");if(i.checked&&ci.length==1&&ai.length>1){pl.classList.remove("partial");i.checked=false;_.removeValue([i.value]);}else if(ci.length>0&&ai.length!=ci.length){pl.classList.add("partial");_.removeValue([i.value]);}else pl.classList.remove("partial");pl=pl.parentNode.closest('.hybriddd-option');start=false;};_.addValue(v);}else{v.push(e.target.value);if(e.target.checked)_.addValue(v);else _.removeValue(v);};if('hybrid-ddi-change'!=e.type&&!e.shiftKey)_.closeSelect(false);}};hsProtype.toggleValue=function(varr,emit){let _=this;if(_.hdd.options[varr[0]].querySelector('input').checked)_.removeValue(varr,emit);else _.addValue(varr,emit);};hsProtype.addValue=function(varr,emit=false){let _=this;switch(_.opt.limitSelection){case 1:_.hdd.options[_.sindex[0]].classList.remove('active');_.sindex=varr;break;default:if(_.sindex.length==1&&_.sindex[0].length==0){_.hdd.options[''].classList.remove('active');_.hdd.options[''].querySelector('input').checked=false;_.sindex=varr;}else _.sindex=_.sindex.concat(varr);if(_.opt.limitSelection>0)_.sindex=_.sindex.slice(0,_.opt.limitSelection);_.clearClass('hover');_.hindex=[];break;};_.value={};_.sindex.forEach(v=>{_.value[v]=_.hdd.options[v].querySelector('label').innerText;_.hdd.options[v].querySelector('input').checked=true;_.hdd.options[v].classList.add('active');});if(_.empty())_.reset();if(!_.isDS)_.updateOriginal();_.hdd.selected.innerHTML=_.opt.selectedLabel(_.value);if(emit)_.emit('change');};hsProtype.removeValue=function(varr,emit=false){let _=this,idx;varr.forEach(v=>{_.hdd.options[v].classList.remove('active');_.hdd.options[v].querySelector('input').checked=false;idx=_.sindex.indexOf(v);if(idx>=0){_.sindex.splice(idx,1);delete _.value[v];}});if(_.sindex.length==0){if('undefined'!=typeof _.hdd.options['']){_.sindex=[''];_.value={'':_.hdd.options[''].querySelector('label').innerText};_.hdd.options[''].querySelector('input').checked=true;_.hdd.options[''].classList.add('active');}else _.value={'':_.opt.defaultText};};if(_.empty())_.reset();if(!_.isDS)_.updateOriginal();_.hdd.selected.innerHTML=_.opt.selectedLabel(_.value);if(emit)_.emit('change');};hsProtype.updateOriginal=function(){let _=this;Object.keys(_.value).forEach(v=>{_.el.selectedIndex=-1;_.el.querySelector('option[value="'+v+'"]').selected=true;});};hsProtype.optionHover=function(){let _=this,v,o,e=arguments[0];if(!e.shiftKey){if(_.hindex.length>0){_.clearClass('hover');_.hindex=[];};return;};if(e.target.classList.contains('hybriddd-option'))o=e.target;else o=e.target.closest('.hybriddd-option');if(o){v=o.querySelector('input').value;switch(e.type){case'mouseleave':_.event(_.hdd.ddlist,'remove',{mouseleave:_.hover});if(v)_.hindex=[v];break;case'mouseenter':if(_.hindex.includes(v)){v=_.hindex[(_.hindex.length-1)];_.hindex=_.hindex.slice(0,-1);}else if(v)_.hindex.push(v);if(_.opt.limitSelection>0)_.hindex=_.hindex.slice(0,_.opt.limitSelection);break;};if(v&&!_.sindex.includes(v))_.hdd.options[v].classList.add('hover');}};hsProtype.clearClass=function(cl){let _=this;if('string'==typeof cl&&cl.length>0){_.hdd.querySelectorAll('.'+cl).forEach(o=>{o.classList.remove(cl)})}};hsProtype.openSelect=function(){let _=this,e=arguments[0];if(_.el.disabled)return;if(e&&e.target){if(e.target.classList.contains('hybriddd-options')||e.target.closest('.hybriddd-options')){return;};e.stopPropagation();_.emit('hybrid-dd-'+e.type);};if(_.hdd.classList.contains('active')){_.closeSelect();return;};_.hdd.classList.add('active');if(0==_.hdd.ddlist.style.width.length)_.hdd.ddlist.style.width=(_.hdd.ddlist.offsetWidth+10)+"px";_.event(document,'add',{click:_.close});_.event(_.hdd,'add',{keyup:_.keyNav});_.event(document,'add',{'hybrid-dd-click':_.close});};hsProtype.closeSelect=function(blur){let _=this,e=arguments[0],e2=arguments[1];if(e&&e.target&&e.target.classList.contains('hybriddd-option'))return;if(e2){if(e2.target.isSameNode(_.el))return;if(_.multi&&(e2.ctrlKey||e2.shiftKey))return;if(e2.target.parentNode.classList.contains('hybriddd-group'))return;if(e2.target.closest('.hybriddd-option'))return;};_.hdd.classList.remove('active');_.clearClass('hover');_.hindex=[];_.event(document,'remove',{click:_.close});_.event(document,'remove',{'hybrid-dd-click':_.close});_.event(_.hdd,'remove',{keyup:_.keyNav});if(_.listenForBulk){_.event(_.hdd.ddlist,'remove',{mouseenter:_.hover});_.listenForBulk=false;};if(blur)_.blur();};return HybridDropdown;})