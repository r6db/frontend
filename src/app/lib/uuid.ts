export default function uuid() {
    // make a series of x digits
    const x = cnt => Math.random()
        .toString(16)
        .split(".")[1]
        .substring(0, cnt || 4);
    // make a single y digit
    const y = () => "89ab"[(Math.random() * 10 | 0) % 4];

    const created = `${x(8)}-${x(4)}-4${x(3)}-${y()}${x(3)}-${x(12)}`;
    return created;
};