// Node.js built-in test runner: no dependencies or installation required.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('all parchment styles are offered in the editor', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const styles = ['pristine', 'aged', 'weathered', 'torn', 'tattered',
    'stained', 'water', 'soiled', 'blood', 'patched'];
  for (const style of styles) {
    assert.match(html, new RegExp('<option value="' + style + '"'));
  }
  assert.ok(html.indexOf('paper-textures.js') < html.indexOf('app.js'));
});

test('paper texture renderer is available and accepts every style', () => {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync('paper-textures.js', 'utf8'), sandbox);
  assert.equal(typeof sandbox.window.drawParchmentTexture, 'function');

  const gradient = { addColorStop() {} };
  const ctx = new Proxy({}, {
    get(_target, prop) {
      if (prop === 'createRadialGradient') return () => gradient;
      if (prop === 'beginPath' || prop === 'fillRect' || prop === 'arc'
        || prop === 'fill' || prop === 'save' || prop === 'restore'
        || prop === 'moveTo' || prop === 'lineTo' || prop === 'stroke'
        || prop === 'ellipse' || prop === 'strokeRect'
        || prop === 'setLineDash') return () => {};
      return undefined;
    },
    set() { return true; }
  });
  for (const paper of ['pristine', 'aged', 'weathered', 'torn', 'tattered',
    'stained', 'water', 'soiled', 'blood', 'patched', 'cream', 'tan', 'pale']) {
    assert.doesNotThrow(() =>
      sandbox.window.drawParchmentTexture(ctx, { paper }, 0, 400, 500), paper);
  }
});

test('application references texture renderer and retains key controls', () => {
  const js = fs.readFileSync('app.js', 'utf8');
  assert.match(js, /window\.drawParchmentTexture/);
  for (const id of ["'add'", "'png'", "'jpg'", "'save'", "'open'"]) {
    assert.ok(js.includes(id), 'Missing control ' + id);
  }
});
