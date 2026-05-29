window.renderHeroParallax = function renderHeroParallax() {
  console.log('renderHeroParallax invoked');
  const container = document.getElementById('hero-root');
  if (!container || !window.ReactDOM || !window.HeroParallax) {
    console.warn('HeroParallax could not initialize', { container, ReactDOM: window.ReactDOM, HeroParallax: window.HeroParallax });
    return;
  }

  if (container.dataset.probixHeroMounted === 'true') return;

  if (ReactDOM.createRoot) {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(HeroParallax, { className: 'pointer-events-none' }));
  } else {
    ReactDOM.render(React.createElement(HeroParallax, { className: 'pointer-events-none' }), container);
  }

  container.dataset.probixHeroMounted = 'true';
};
