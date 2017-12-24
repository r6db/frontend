export default function(duration) {
    const cache = {};

    function get(key) {
        if (!key) {
            return null;
        }
        const item = cache[key];
        if (item) {
            return item.timestamp > Date.now() ? item.data : null;
        }
        return null;
    }

    function set(key, data) {
        cache[key] = {
            timestamp: Date.now() + duration,
            data,
        };
    }
    return {
        get,
        set,
    };
}
