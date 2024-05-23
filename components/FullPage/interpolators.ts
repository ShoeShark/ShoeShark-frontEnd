import { log } from "utils/util";

export function getInterpolators() {
    function firstSectionInterpolator(proportion) {
        if (proportion < 0) {
            return { opacity: 0, transform: `scale(${4})` };
        } else if (proportion < 0.1) {
            return {
                opacity: proportion * 10,
                transform: `scale(${4 - (4 - 1) * proportion * 10})`,
            };
        } else if (proportion < 1) {
            return {
                opacity: 1,
            };
        } else if (proportion < 1.1) {
            return {
                opacity: (1.1 - proportion) * 10,
                transform: `scale(${4 - (1.1 - proportion) * 10 * 3})`,
            };
        } else {
            return { opacity: 0 };
        }
    }

    function secondSectionBackgroundInterpolator(proportion) {
        if (proportion < -0.3) {
            return { transform: `translateY(20rem) scaleX(0.05)` };
        } else if (proportion < 0) {
            const position = -proportion * 20 * 3.3;
            const scale = 1 + proportion * 3.3 * 0.95;
            return { transform: `translateY(${position}rem) scaleX(${scale})` };
        } else if (proportion < 1) {
            return {};
        } else if (proportion < 1.3) {
            const scale = (1.3 - proportion) / 0.3;
            return { transform: `scaleX(${scale})` };
        } else {
            return { transform: 'scaleX(0)' };
        }
    }

    function secondSectionForegroundInterpolator(proportion) {
        if (proportion < 0) {
            return { opacity: 0, transform: 'translateX(-20rem)' };
        } else if (proportion > 1) {
            return { opacity: 0, transform: 'translateX(20rem)' };
        } else {
            return {};
        }
    }

    function thirdSectionInterpolator(proportion) {}

    function fourthSectionInterpolator(proportion) {
        if (proportion < 0) {
            return { opacity: 0, transform: 'translateY(-20rem) rotate(45deg)', color: 'red' };
        } else if (proportion < 0.5) {
            return {
                opacity: proportion * 2,
                transform: `translateY(${-20 + proportion * 2 * 20}rem) rotate(${45 - proportion * 2 * 45}deg)`,
                color: `rgb(${proportion * 2 * 255}, 0, 0)`
            };
        } else if (proportion < 1) {
            return {
                opacity: 1,
                transform: 'translateY(0)',
                color: 'green'
            };
        } else if (proportion < 1.5) {
            return {
                opacity: (1.5 - proportion) * 2,
                transform: `translateY(${(proportion - 1) * 2 * 20}rem) rotate(${(proportion - 1) * 2 * 45}deg)`,
                color: `rgb(0, ${(1.5 - proportion) * 2 * 255}, 0)`
            };
        } else {
            return { opacity: 0, color: 'blue' };
        }
    }
    
    function fifthSectionInterpolator(proportion) {
        if (proportion < 0) {
            return { opacity: 0, transform: 'scale(0.5)', backgroundColor: 'purple' };
        } else if (proportion < 1) {
            return {
                opacity: proportion,
                transform: `scale(${0.5 + proportion * 0.5})`,
                backgroundColor: `rgb(${proportion * 255}, 0, ${proportion * 255})`
            };
        } else {
            return { opacity: 1, transform: 'scale(1)', backgroundColor: 'orange' };
        }
    }
    
    return {
        firstSectionInterpolator,
        secondSectionBackgroundInterpolator,
        secondSectionForegroundInterpolator,
        fourthSectionInterpolator,
        fifthSectionInterpolator,
    };

    return {
        firstSectionInterpolator,
        secondSectionBackgroundInterpolator,
        secondSectionForegroundInterpolator,
    };
}
