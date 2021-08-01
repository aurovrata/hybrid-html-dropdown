(function(){
  console.log('test....');
  function docReady(fn) {
    if (document.readyState!='loading'){
      fn();
    }else if (document.addEventListener){
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  docReady( (e)=>{
    let hl= document.querySelectorAll('.hybrid-list');
    for(let el of hl) new HybridDropdown(el,{});
  });
})();
