// Yıl
document.getElementById('y').textContent = new Date().getFullYear();

// Cookie
(function(){
  var key = 'dh_cc_ok_v1';
  var bar = document.getElementById('cookie');
  var btn = document.getElementById('cookie-accept');
  if(!localStorage.getItem(key)) bar.classList.add('show');
  btn.addEventListener('click', function(){
    localStorage.setItem(key,'1');
    bar.classList.remove('show');
  });
})();
