export const extractColumnKeys = (data) => {
  const columnKeys = new Set();
  columnKeys.add("YEAR");
  for (const item in data) {
    for (const key in data[item]) {
      columnKeys.add(key);
    }
  }
  columnKeys.add("ANNUAL_PAYOUT");
  return Array.from(columnKeys);
};
