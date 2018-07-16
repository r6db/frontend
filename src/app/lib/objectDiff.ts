export enum DiffStrategy {
    IGNORE,
    KEEP,
    THROW
}
export default function diff<T>(a: T, b: any, strategy: DiffStrategy): T {
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
            return diffNumber(a, b) as any;
        } else if (typeof a === "string") {
            // don't diff strings
            return a;
        } else if (Array.isArray(a)) {
            // don't diff arrays
            return a;
        } else {
            return diffObject<T>(a, b, strategy);
        }
    }
}

function diffObject<T>(
    a: T,
    b: object,
    strat: DiffStrategy = DiffStrategy.THROW
): T {
    return Object.keys(a).reduce((target, key) => {
        if (key === 'bestScore') {
            target[key] = b[key];
        } else {
            target[key] = diff(a[key], b[key], strat);
        }
        return target;
    }, {}) as T;
}
function diffNumber(a: number, b: number): number {
    if (!b) {
        return a;
    } else {
        return a - b;
    }
}
