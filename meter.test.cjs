const { test } = require('node:test');
const assert = require('node:assert/strict');
const { measure } = require('./meter.js');
test('tensões entre todos os pares e inversão de polaridade', () => {
  const nodes = { GND: 0, VIN: 12, MID: 6 };
  for (const [red, vr] of Object.entries(nodes)) {
    for (const [black, vb] of Object.entries(nodes)) {
      assert.equal(measure(red, black).volts, vr - vb);
      assert.equal(measure(red, black, false).volts, 0);
    }
  }
});
test('ponta desconectada ou nó inválido não produz leitura', () => {
  for (const [red, black] of [['', 'GND'], ['VIN', ''], ['', ''], ['INVALID', 'GND'], ['VIN', 'toString']]) {
    assert.equal(measure(red, black).volts, null);
    assert.equal(measure(red, black).text, '---');
  }
});
test('visor informa unidade e sinal', () => {
  assert.equal(measure('VIN', 'GND').text, '12.000 V DC');
  assert.equal(measure('GND', 'VIN').text, '-12.000 V DC');
  assert.equal(measure('MID', 'GND').text, '6.000 V DC');
});
