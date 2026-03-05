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
    bottle: { angle: 28, top: 50, left: 50 },
    shadow: { sx: 1.0, sy: 0.56, blur: 82, op: 0.38 },
  },
  {
    brand: 'NETARKOS',
    cta: 'BUY BEER',
    bottle: { angle: -28, top: 50, left: 50 },
    shadow: { sx: 1.15, sy: 0.5, blur: 88, op: 0.42 },
  },
  {
    brand: 'NETARKOS',
    cta: 'BUY BEER',
    bottle: { angle: -108, top: 50, left: 50 },
    shadow: { sx: 1.42, sy: 0.42, blur: 96, op: 0.45 },
  },
  {
    brand: 'NETARKOS',
    cta: 'BUY BEER',
    bottle: { angle: 90, top: 50, left: 50 },
    shadow: { sx: 1.36, sy: 0.44, blur: 94, op: 0.44 },
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

  bottleWrap.style.setProperty('--sx', cfg.shadow.sx);
  bottleWrap.style.setProperty('--sy', cfg.shadow.sy);
  bottleWrap.style.setProperty('--blur', `${cfg.shadow.blur}px`);
  bottleWrap.style.setProperty('--op', cfg.shadow.op);

  brand.textContent = cfg.brand;
  ctaButton.textContent = cfg.cta;
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

applyStep(currentStep);
