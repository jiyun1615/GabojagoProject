window.addEventListener('load', function() {
  var allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, function(el) {
      var includePath = el.dataset.includePath;
      if (includePath) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                  el.outerHTML = this.responseText;
              }
          };
          xhttp.open('GET', includePath, true);
          xhttp.send();
      }
  });
});

const bookBtn = document.querySelector('.bookmark-btn');
const close = document.querySelector('.close-btn');

const area = document.querySelector('.side-bar')
const section = document.querySelector('section');
console.log(section);
const label = document.querySelector('label');

bookBtn.addEventListener('click', function(){
    area.style.display='block';
    section.style.left=0;
    label.style.opacity=0;
})

close.addEventListener('click', function(){
    area.style.display='none';
    section.style.left='-1000px';
    label.style.opacity=1;
})



 