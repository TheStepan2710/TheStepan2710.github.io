const stage = document.getElementById('stage');
const scenes = document.getElementById('scenes');
const bottleWrap = document.getElementById('bottleWrap');
const bottle = document.getElementById('bottle');
const brand = document.getElementById('brand');
const ctaButton = document.getElementById('ctaButton');

const stepConfig = [
  {
    brand: 'NETARKOS',
    cta: 'BUY BEER',
    bottle: { angle: -18, top: 50, left: 50, width: 'clamp(320px, 34vw, 512px)' },
    shadow: { sx: 0.92, sy: 0.5, blur: 56, op: 0.2 },
  },
  {
    brand: 'NETARKOS',
    cta: 'BUY NOW',
    bottle: { angle: -8, top: 50, left: 50, width: 'clamp(320px, 34vw, 512px)' },
    shadow: { sx: 1.02, sy: 0.46, blur: 60, op: 0.22 },
  },
  {
    brand: 'LAGUNITAS',
    cta: 'BUY BEER',
    bottle: { angle: 90, top: 50, left: 50, width: 'clamp(320px, 34vw, 512px)' },
    shadow: { sx: 1.2, sy: 0.38, blur: 66, op: 0.24 },
  },
  {
    brand: 'LAGUNITAS',
    cta: 'BUY NOW',
    bottle: { angle: 0, top: 50, left: 50, width: 'clamp(320px, 34vw, 512px)' },
    shadow: { sx: 1.12, sy: 0.4, blur: 62, op: 0.22 },
  },
  {
    brand: 'LAGUNITAS',
    cta: 'BUY BEER',
    bottle: { angle: 0, top: 50, left: 66, width: 'min(72vw, 1120px)' },
    shadow: { sx: 0.9, sy: 0.36, blur: 52, op: 0.16 },
  },
];

const totalSteps = stepConfig.length;
const lockDuration = 760;
let currentStep = 0;
let isLocked = false;

function clampStep(value) {
  return Math.max(0, Math.min(totalSteps - 1, value));
}

function applyStep(index) {
  const cfg = stepConfig[index];
  scenes.style.transform = `translate3d(0, -${index * 100}vh, 0)`;

  bottle.style.transform = `rotate(${cfg.bottle.angle}deg)`;
  bottleWrap.style.top = `${cfg.bottle.top}%`;
  bottleWrap.style.left = `${cfg.bottle.left}%`;
  bottleWrap.style.width = cfg.bottle.width;

  bottleWrap.style.setProperty('--sx', cfg.shadow.sx);
  bottleWrap.style.setProperty('--sy', cfg.shadow.sy);
  bottleWrap.style.setProperty('--blur', `${cfg.shadow.blur}px`);
  bottleWrap.style.setProperty('--op', cfg.shadow.op);

  brand.textContent = cfg.brand;
  ctaButton.textContent = cfg.cta;
  stage.dataset.step = String(index);
}

function goToStep(nextStep) {
  const clamped = clampStep(nextStep);
  if (clamped === currentStep || isLocked) {
    return;
  }

  currentStep = clamped;
  applyStep(currentStep);
  isLocked = true;

  window.setTimeout(() => {
    isLocked = false;
  }, lockDuration);
}

function nextStep() {
  goToStep(currentStep + 1);
}

function prevStep() {
  goToStep(currentStep - 1);
}

stage.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault();
    if (isLocked || Math.abs(event.deltaY) < 7) {
      return;
    }

    if (event.deltaY > 0) {
      nextStep();
    } else {
      prevStep();
    }
  },
  { passive: false }
);

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    nextStep();
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    prevStep();
  }
});

bottleWrap.addEventListener('click', () => {
  nextStep();
});

scenes.style.height = `${totalSteps * 100}vh`;
applyStep(currentStep);
