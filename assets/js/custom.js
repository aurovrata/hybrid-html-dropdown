(function(){
  function docReady(fn) {
    if (document.readyState!='loading'){
      fn();
    }else if (document.addEventListener){
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  docReady( (e)=>{
    let el, hl= document.querySelectorAll('.hybrid-list');
    for(el of hl) new HybridDropdown(el,{});

    el= document.querySelector('#flip-style');
    if(el){
      new HybridDropdown(sel,{'negative':false});
      sel.addEventListener('change', (ce) => {
        let el = ce.target,
          hdd = el._hybriddd; //hybrid object is stored on the element on which it was instantiated
        if( hdd && ""!=hdd.value[0]){ //hybrid value is always an array.
          if(!hdd.opt.negative){ //if previously negative, let's refresh.
            hdd.refresh({'negative':true});
          }
        }else if(hdd.opt.negative) hdd.refresh({'negative':false}); //flip back.
      })
    }
  });
})();
