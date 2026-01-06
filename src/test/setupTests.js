import '@testing-library/jest-dom';

// Silence noisy resize observer errors in jsdom where needed.
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
global.ResizeObserver = global.ResizeObserver || ResizeObserver;

// IntersectionObserver is not implemented in jsdom.
class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
global.IntersectionObserver = global.IntersectionObserver || IntersectionObserver;

// jsdom doesn't implement scrollIntoView.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// scrollIntoView is not implemented in jsdom.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
