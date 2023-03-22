export type Data = Array<{
  date: string;
  [key: string]: number | string | null | undefined;
}>;

export function transformData(data: Data, keys: Array<string>) {
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

export function addDays(data: Data, by: "day" | "week" | "month" = "day") {
  if (by === "day") {
    return data;
  }

  const monthes = data.reduce((acc: any, item) => {
    const date = new Date(item.date.split(".").reverse().join("."));
    const dateFormatter = new Intl.DateTimeFormat("ua", {
      year: "numeric",
      month: "long",
    });
    const month = dateFormatter.format(date);

    if (!acc[month]) {
      acc[month] = { date: month };
    }

    Object.keys(item).forEach((key) => {
      if (typeof item[key] === "number") {
        acc[month][key] = (acc[month][key] || 0) + item[key];
      }
    });

    return acc;
  }, {});

  return Object.values(monthes);
}
