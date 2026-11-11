/* =====================================================================
   THVC Fund — v10 · main.js (JavaScript thuần, không thư viện)
   1. Hiện dần khi cuộn (v09)        2. Nút lên đầu trang (v09)
   3. Menu: sub menu + hamburger     4. Banner nổi bật (Trang chủ)
   5. Bộ lọc + tìm kiếm danh sách    6. Form đề xuất đầu tư (DEMO, không gửi)
   ===================================================================== */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var each = function(list, fn){ Array.prototype.forEach.call(list, fn); };

  /* 1. Hiện dần khi cuộn (giữ nguyên v09) */
  var els = document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){ each(els, function(e){ e.classList.add('in'); }); }
  else{
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -8% 0px'});
    each(els, function(e){ io.observe(e); });
  }

  /* 2. Nút lên đầu trang (giữ nguyên v09; chỉ hiện trên máy tính — xem CSS) */
  var top = document.querySelector('.to-top');
  if(top){
    var onScroll = function(){ top.classList.toggle('show', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
    top.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); });
  }

  /* 3. Menu: mục cha chỉ mở sub menu (Human chốt), hamburger trên mobile */
  var hdr = document.querySelector('.hdr');
  var tg = document.querySelector('.nav-toggle');
  var subs = document.querySelectorAll('.ni.has-sub');
  function closeAll(except){
    each(subs, function(li){
      if(li === except) return;
      li.classList.remove('is-open');
      var b = li.querySelector('.nt'); if(b) b.setAttribute('aria-expanded','false');
    });
  }
  each(subs, function(li){
    var b = li.querySelector('.nt');
    b.addEventListener('click', function(){
      var o = !li.classList.contains('is-open');
      closeAll(li);
      li.classList.toggle('is-open', o);
      b.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
  });
  function closeMobile(){
    if(hdr && hdr.classList.contains('is-open')){
      hdr.classList.remove('is-open');
      tg.setAttribute('aria-expanded','false');
      tg.setAttribute('aria-label','Mở menu');
    }
  }
  if(tg){
    tg.addEventListener('click', function(){
      var o = !hdr.classList.contains('is-open');
      hdr.classList.toggle('is-open', o);
      tg.setAttribute('aria-expanded', o ? 'true' : 'false');
      tg.setAttribute('aria-label', o ? 'Đóng menu' : 'Mở menu');
      if(o){ /* mở sẵn nhóm của trang đang xem */
        var act = document.querySelector('.ni.has-sub.is-active');
        if(act){ closeAll(act); act.classList.add('is-open'); act.querySelector('.nt').setAttribute('aria-expanded','true'); }
      }
    });
  }
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav') && !e.target.closest('.nav-toggle')){ closeAll(); closeMobile(); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      var openBtn = document.querySelector('.ni.is-open > .nt');
      closeAll();
      if(hdr && hdr.classList.contains('is-open')){ closeMobile(); tg.focus(); }
      else if(openBtn){ openBtn.focus(); }
    }
  });
  window.addEventListener('resize', function(){ if(window.innerWidth >= 1100) closeMobile(); });

  /* 4. Banner nổi bật: tự chuyển 6 giây; dừng khi rê chuột/bấm phím; tắt khi giảm chuyển động */
  each(document.querySelectorAll('[data-carousel]'), function(c){
    var tr = c.querySelector('.feat-track'), sl = tr.children, dots = c.querySelector('.dots'), i = 0, t = null;
    function mark(){ each(dots.children, function(d, k){ d.setAttribute('aria-current', k === i ? 'true' : 'false'); }); }
    function go(n){ i = (n + sl.length) % sl.length; tr.scrollTo({left: i * tr.clientWidth, behavior: reduce ? 'auto' : 'smooth'}); mark(); }
    function stop(){ if(t){ clearInterval(t); t = null; } }
    function restart(){ stop(); if(!reduce && sl.length > 1) t = setInterval(function(){ go(i + 1); }, 6000); }
    for(var k = 0; k < sl.length; k++){
      (function(k){
        var d = document.createElement('button');
        d.type = 'button'; d.setAttribute('aria-label', 'Xem mục ' + (k + 1));
        d.addEventListener('click', function(){ go(k); restart(); });
        dots.appendChild(d);
      })(k);
    }
    tr.addEventListener('scroll', function(){
      var n = Math.round(tr.scrollLeft / tr.clientWidth);
      if(n !== i && n >= 0 && n < sl.length){ i = n; mark(); }
    }, {passive:true});
    var pv = c.querySelector('[data-prev]'), nx = c.querySelector('[data-next]');
    if(pv) pv.addEventListener('click', function(){ go(i - 1); restart(); });
    if(nx) nx.addEventListener('click', function(){ go(i + 1); restart(); });
    c.addEventListener('mouseenter', stop); c.addEventListener('mouseleave', restart);
    c.addEventListener('focusin', stop); c.addEventListener('focusout', restart);
    mark(); restart();
  });

  /* 5. Bộ lọc + tìm kiếm: <div data-filter="id-danh-sach">; mục có data-cat="a b", data-year="2026" */
  each(document.querySelectorAll('[data-filter]'), function(f){
    var list = document.getElementById(f.getAttribute('data-filter')); if(!list) return;
    var items = list.querySelectorAll('[data-cat]');
    var chips = f.querySelectorAll('.fchip');
    var q = f.querySelector('input[type="search"]');
    var sel = f.querySelector('select');
    var cnt = document.querySelector('[data-count="' + list.id + '"]');
    var empty = document.querySelector('[data-empty="' + list.id + '"]');
    var pressed = f.querySelector('.fchip[aria-pressed="true"]');
    var cat = pressed ? pressed.getAttribute('data-value') : 'all';
    function apply(){
      var s = (q && q.value || '').trim().toLowerCase(), y = sel ? sel.value : 'all', n = 0;
      each(items, function(it){
        var ok = (cat === 'all' || (' ' + it.getAttribute('data-cat') + ' ').indexOf(' ' + cat + ' ') > -1)
              && (y === 'all' || it.getAttribute('data-year') === y)
              && (!s || it.textContent.toLowerCase().indexOf(s) > -1);
        it.classList.toggle('hide', !ok); if(ok) n++;
      });
      if(cnt) cnt.textContent = n + ' kết quả';
      if(empty) empty.classList.toggle('show', n === 0);
    }
    each(chips, function(b){
      b.addEventListener('click', function(){
        cat = b.getAttribute('data-value');
        each(chips, function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        apply();
      });
    });
    if(q) q.addEventListener('input', apply);
    if(sel) sel.addEventListener('change', apply);
    apply();
  });

  /* 6. Form đề xuất đầu tư — DEMO: chỉ kiểm tra dữ liệu, KHÔNG gửi đi.
        Dev nối phần gửi (giai đoạn 1: chuyển vào email của Quỹ). */
  var form = document.querySelector('form[data-demo]');
  if(form){
    var okBox = document.getElementById('form-ok'), badBox = document.getElementById('form-bad');
    var check = function(fld){
      var inp = fld.querySelector('input, select, textarea'); if(!inp) return true;
      var filled = inp.type === 'checkbox' ? inp.checked : inp.value.trim() !== '';
      var valid = filled && inp.checkValidity();
      fld.classList.toggle('invalid', !valid);
      inp.setAttribute('aria-invalid', valid ? 'false' : 'true');
      return valid;
    };
    each(form.querySelectorAll('.fld[data-req]'), function(fld){
      var inp = fld.querySelector('input, select, textarea');
      inp.addEventListener('blur', function(){ check(fld); });
      inp.addEventListener('change', function(){ if(fld.classList.contains('invalid')) check(fld); });
    });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var first = null;
      each(form.querySelectorAll('.fld[data-req]'), function(fld){ if(!check(fld) && !first) first = fld; });
      okBox.classList.remove('show'); badBox.classList.remove('show');
      var box = first ? badBox : okBox;
      box.classList.add('show');
      box.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'center'});
      box.focus({preventScroll:true});
      if(!first) form.reset();
    });
  }
})();
