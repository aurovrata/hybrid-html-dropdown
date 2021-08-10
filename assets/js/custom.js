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
      new HybridDropdown(el,{'negative':false});
      el.addEventListener('change', (ce) => {
        let hdd = ce.target._hybriddd; //hybrid object is stored on the element on which it was instantiated
        if(!hdd) return; //no hybrid here.
        if(Object.keys(hdd.value).length>0 && !hdd.value['']){ //hybrid value is always an object of value=>label.
          if(!hdd.opt.negative){ //if previously negative, let's refresh.
            hdd.refresh({'negative':true});
          }
        }else if(hdd.opt.negative) hdd.refresh({'negative':false}); //flip back.
      })
    }
    let fe = document.querySelector('#filter-list'),
     re = document.querySelector('#radio-filter');
    if(fe){
      let hdd =new HybridDropdown(fe,
        {
          'listOption':function(o,i){
            if(o.classList.contains('vegetarian')) return true;
            return false;
          }
        }
      );
      re.addEventListener('change', (ce) => {
        hdd.refresh({
          'listOption':function(o,i){
            if(o.classList.contains(ce.target.value)) return true;
            return false;
          }
        }
      );
      })
    }
    //defaults
    fe = document.querySelector('#defaults');
    if(fe){
      new HybridDropdown(fe,
        {
          'limitSelection': -1,
          'fieldName':'dishes[]',
          'defaultText': '---dishes---',
          'selectedLabel':function(v){ //is a value=>label object.
            let k =  Object.keys(v),
                s='';
            k.forEach(i=>{
              s+=`<span>${v[i].trim()}</span>,&nbsp;`;
            });
            return s.slice(0,-7);
          }
        });
    }
    //with images
    let wi = document.querySelector('#with-images');
    if(wi){
      new HybridDropdown(wi,
        {
          'optionLabel':function(lbl){ //is a value=>label object.
            return `<div><img src="${lbl[1]}" alt="${lbl[0]}" /><p>${lbl[0]}</p></div>`;
          }
        }
      )
    }
  })
})();
