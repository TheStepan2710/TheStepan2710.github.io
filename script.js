const bottleWrap = document.getElementById('bottleWrap');
const bottle = document.getElementById('bottle');

let rotation = 0;
let step = 0; // 0..3

// 4 профиля тени под 0/90/180/270.
// Идея: когда бутылка “более горизонтальна”, тень длиннее по X и чуть плотнее.
// Подкрути значения под свой PNG — это нормально.
const shadowProfiles = [
  { sx: 1.00, sy: 0.55, blur: 80,  op: 0.42, cblur: 20, cop: 0.22 }, // 0°
  { sx: 1.25, sy: 0.45, blur: 90,  op: 0.46, cblur: 22, cop: 0.24 }, // 90°
  { sx: 1.00, sy: 0.55, blur: 80,  op: 0.42, cblur: 20, cop: 0.22 }, // 180°
  { sx: 1.25, sy: 0.45, blur: 90,  op: 0.46, cblur: 22, cop: 0.24 }, // 270°
];

function applyShadowProfile(p) {
  bottleWrap.style.setProperty('--sx', p.sx);
  bottleWrap.style.setProperty('--sy', p.sy);
  bottleWrap.style.setProperty('--blur', `${p.blur}px`);
  bottleWrap.style.setProperty('--op', p.op);

  bottleWrap.style.setProperty('--cblur', `${p.cblur}px`);
  bottleWrap.style.setProperty('--cop', p.cop);
}

function update() {
  bottle.style.transform = `rotate(${rotation}deg)`;
  applyShadowProfile(shadowProfiles[step]);
}

bottleWrap.addEventListener('click', () => {
  rotation += 90;
  step = (step + 1) % 4;
  update();
});

update();