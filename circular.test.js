/* customizable defaults */
const globalAngleDefault = '270deg';

const angleRegex = new RegExp('([+-]?\\d*[.]?\\d+)?(π?)(deg|grad|rad|turn)?');


function resolveAngle(angleStr) {
    if (!angleStr) {
        return globalAngleDefault;
    }

    let [, angle, pi, unit] = angleRegex.exec(angleStr);
    if (!unit) {
        if (pi) {
            unit = 'rad';
            if (!angle) {
                angle = 1;
            }
        } else if (Math.abs(parseFloat(angle)) > 2 * Math.PI) {
            unit = 'deg';
        } else {
            unit = 'rad';
        }
    }
    return adjustAngle(angle, pi, unit);
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function parseRadian(radian, pi) {
    if (pi) {
        return mod(radian + 1.5, 2) * Math.PI;
    } else {
        return mod(radian / Math.PI + 1.5, 2) * Math.PI;
    }
}

function adjustAngle(angle, pi, unit) {
    switch(unit) {
    case 'deg':
        return `${mod(parseFloat(angle) + 270, 360)}${unit}`;
    case 'grad':
        return `${mod(parseFloat(angle) + 300, 400)}${unit}`;
    case 'rad':
        return `${parseRadian(parseFloat(angle), pi)}${unit}`;
    case 'turn':
        return `${mod(parseFloat(angle) + 0.75, 1)}${unit}`;
    }
}

test('Parse and calibrate angle', () => {
    expect(resolveAngle('0')).toEqual(`${1.5 * Math.PI}rad`);
    expect(resolveAngle('270')).toEqual('180deg');
    expect(resolveAngle('0deg')).toEqual('270deg');
    expect(resolveAngle('0grad')).toEqual('300grad');
    expect(resolveAngle('1.2turn')).toEqual('0.95turn');
    expect(resolveAngle('-2πrad')).toEqual(`${1.5 * Math.PI}rad`);
    expect(resolveAngle('+2πrad')).toEqual(`${1.5 * Math.PI}rad`);
    expect(resolveAngle('π')).toEqual(`${0.5 * Math.PI}rad`);
});


function circularOrdering(n1, n2) {
    if (n1 >= 0) {
        if (n2 >= 0) {
            return n1 - n2;
        } else {
            return -1;
        }
    } else {
        if (n2 >= 0) {
            return 1;
        } else {
            return n1 - n2;
        }
    }
}


test('Circular ordering', () => {
    expect([1, 2, 3, 4, 5].sort(circularOrdering)).toEqual([1, 2, 3, 4, 5]);
    expect([5, 2, 1, 4, 3].sort(circularOrdering)).toEqual([1, 2, 3, 4, 5]);
    expect([0, 5, -1, 2, -2, 1, -3, -5, 4, -4, 3].sort(circularOrdering)).toEqual([0, 1, 2, 3, 4, 5, -5, -4, -3, -2, -1]);
});