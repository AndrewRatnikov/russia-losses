export function transformData(
  data: Array<{ [key: string]: number | string | null | undefined }>,
  keys: Array<string>
) {
  return data.map((item, index) => {
    return keys.reduce(
      (obj, key) => ({
        ...obj,
        [key]: isValid(
          index === data.length - 1
            ? item[key]
            : getItem(item[key], data[index + 1][key])
        ),
      }),
      {}
    );
  });
}

export function getItem(
  cur: null | number | string | undefined,
  prev: null | number | string | undefined
) {
  if (typeof cur === "string" || typeof prev === "string") {
    return cur;
  }

  if (!cur) {
    return prev;
  }

  if (!prev) {
    return cur;
  }

  return cur - prev;
}

export function isValid(
  value: string | number | null | undefined
): string | number {
  return value ? value : 0;
}
