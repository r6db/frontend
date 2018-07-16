export enum DiffStrategy {
    IGNORE,
    KEEP,
    THROW
}
export default function diff<T>(a: T, b: any, strategy: DiffStrategy, blacklist: string[] = []): T {
    if (typeof a !== typeof b) {
        switch (strategy) {
            case DiffStrategy.THROW:
                throw new Error(
                    `type of a and b differs (a='${typeof a}', b='${typeof b}'`
                );
            case DiffStrategy.IGNORE:
                return undefined;
            case DiffStrategy.KEEP:
                return b;
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
            return diffObject<T>(a, b, strategy, blacklist);
        }
    }
}

function diffObject<T>(
    a: T,
    b: object,
    strat: DiffStrategy = DiffStrategy.THROW,
    blacklist: string[] = []
): T {
    return Object.keys(a).reduce((target, key) => {
        if (blacklist.includes(key)) {
            target[key] = b[key];
        } else {
            target[key] = diff(a[key], b[key], strat, blacklist);
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
