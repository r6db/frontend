export default function trim(str: string) {
    return str.replace(/\s{2,}/g, " ");
}
