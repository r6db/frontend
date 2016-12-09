export const methods = {

};

export const Method = function (name) {
    let _acquire;
    let _filter;
    let _process;
    const _name = name;
    this.acquire = function (cb) {
        _acquire = cb;
        return this;
    };
    this.filter = function (cb) {
        _filter = cb;
        return this;
    };
    this.process = function (cb) {
        _process = cb;
        return this;
    };
    this.getTask = function () {
        return {
            acquire: _acquire,
            filter: _filter,
            process: _process
        };
    };
};

export function register(name) {
    const m = new Method(name);
    methods[name] = m;
    return m;
}

