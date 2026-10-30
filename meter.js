(function (root) {
  'use strict';
  // Fonte ideal de 12 V; R1 = R2 = 1 kohm; multímetro ideal.
  const potentials = Object.freeze({ GND: 0, VIN: 12, MID: 6 });
  function measure(red, black, powered = true) {
    if (!Object.hasOwn(potentials, red) || !Object.hasOwn(potentials, black)) {
      return { volts: null, text: '---', status: 'Conecte as duas pontas.' };
    }
    const volts = powered ? potentials[red] - potentials[black] : 0;
    return { volts, text: volts.toFixed(3) + ' V DC', status: `V(${red}) − V(${black})` };
  }
  const meter = Object.freeze({ measure });
  if (typeof module !== 'undefined' && module.exports) module.exports = meter;
  else root.BenchMeter = meter;
})(globalThis);
