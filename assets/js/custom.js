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
    let sel= document.querySelector('#ex1-hdd');
    new HybridDropdown(sel,{});
  });
})();
