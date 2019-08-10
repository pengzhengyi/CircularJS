(function() {
    /* customizable defaults */
    const globalRadiusDefault = '0px';
    const globalAngleDefault = '270deg';

    const circularContainerSelector = '.circular-container';
    const circularItemSelector = '.circular-item';
    const circularCenterSelector = '.circular-center';

    const angleRegex = new RegExp('([+-]?\\d*[.]?\\d+)?(π?)(deg|grad|rad|turn)?');

    function applyToPage() {
        document.querySelectorAll(circularContainerSelector).forEach(placeCircularContainer);
        document.querySelectorAll(circularCenterSelector).forEach(placeCircularCenter);
        document.querySelectorAll(circularItemSelector).forEach(placeCircularItem);
    }

    function placeCircularContainer(element) {
        element.style.position = 'relative';
        preorderCircularItems(element);
    }

    /**
     * Sort according to Two's Complement's bit representation
     * [0, ... , +inf, -inf, ... , -1]
     */
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

    function preorderCircularItems(containerElement) {
        const circularElements = Array.from(containerElement.querySelectorAll(`${circularItemSelector}[data-order]`))
            .sort((circularItem1, circularItem2) => circularOrdering(parseFloat(circularItem1.dataset.order), parseFloat(circularItem2.dataset.order)));
        const angleBetweenItems = 360 / circularElements.length;
        circularElements.forEach(function (circularElement, order) {
            const angle = order * angleBetweenItems;
            if (!('angle' in circularElement.dataset) || !circularElement.dataset.angle) {
                circularElement.dataset.angle = angle;
            }
        });
    }

    function placeCircularItem(element) {
        placeCircularCenter(element);
        translateElement(element, getRadius(element), getAngle(element));
    }

    function placeCircularCenter(element) {
        element.style.position = 'absolute';
        element.style.top = '50%';
        element.style.left = '50%';
        element.style.transform = 'translate(-50%, -50%)';
    }

    function translateElement(element, radius, angle) {
        element.style.transform += `rotate(${angle}) translate(${radius}) rotate(-${angle})`;
    }

    function getRadius(element) {
        if ('radius' in element.dataset) {
            return element.dataset.radius || globalRadiusDefault;
        } else {
            return getDefaultRadius(element);
        }
    }

    function getDefaultRadius(element) {
        const circularContainer = element.closest(circularContainerSelector);
        if (circularContainer) {
            return circularContainer.dataset.radius || globalRadiusDefault;
        } else {
            return globalRadiusDefault;
        }
    }

    function getAngle(element) {
        if ('angle' in element.dataset) {
            return resolveAngle(element.dataset.angle);
        } else {
            return globalAngleDefault;
        }
    }

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

    applyToPage();
})();