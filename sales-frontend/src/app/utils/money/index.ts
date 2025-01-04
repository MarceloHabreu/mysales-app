export const convertToBigDecimal = (value: string): number => {
    if (!value) {
        return 0;
    }
    /* 2.000,00 -> 2000.00 */
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
};

export const formatReal = (value: string): string => {
    const v = ((parseInt(value.replace(/\D/g, ""), 10) / 100).toFixed(2) + "").split(".");

    const m = v[0]
        .split("")
        .reverse()
        .join("")
        .match(/.{1,3}/g);

    if (m != null) {
        for (let i = 0; i < m.length; i++) m[i] = m[i].split("").reverse().join("") + ".";

        const r = m.reverse().join("");

        return r.substring(0, r.lastIndexOf(".")) + "," + v[1];
    }
    return value;
};
