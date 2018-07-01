export enum DiffStrategy {
    IGNORE,
    KEEP,
    THROW
}
export default function diff<T>(a: T, b: any, strategy: DiffStrategy) {
    if (typeof a !== typeof b) {
        switch (strategy) {
            case DiffStrategy.THROW:
                throw new Error(
                    `type of a and b differs (a='${typeof a}', b='${typeof b}'`
                );
            case DiffStrategy.IGNORE:
                return undefined;
            case DiffStrategy.KEEP:
                return a;
            // this should never happen
            default:
                return null;
        }
    } else {
        if (typeof a === "number") {
            return diffNumber(a, b);
        } else if (typeof a === "string") {
            // don't diff strings
            return a;
        } else if (Array.isArray(a)) {
            // don't diff arrays
            return a;
        } else {
            return diffObject(a, b, strategy);
        }
    }
}

function diffObject<T>(
    a: T,
    b: object,
    strat: DiffStrategy = DiffStrategy.THROW
) {
    return Object.keys(a).reduce((target, key) => {
        target[key] = diff(a[key], b[key], strat);
        return target;
    }, {});
}
function diffNumber(a: number, b: number) {
    if (!b) {
        return a;
    } else {
        return a - b;
    }
}
