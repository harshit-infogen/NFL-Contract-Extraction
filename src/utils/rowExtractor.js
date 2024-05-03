import { extractColumnKeys } from "./columnExtractor";

export const extractRowData = (data) => {
  const columnKeys = extractColumnKeys(data);
  const rowData = [];
  const columnTotals = {};

  // Initialize totals column
  columnKeys.slice(1).forEach((colKey) => {
    columnTotals[colKey] = 0;
  });

  for (const year in data) {
    let annualPayout = 0;
    const row = { YEAR: year };
    const yearData = data[year];

    for (const key of columnKeys) {
      if (key !== "YEAR") {
        if (Object.prototype.hasOwnProperty.call(yearData, key)) {
          row[key] = [yearData[key].amount, yearData[key].condition];
          // Add annual payout
          annualPayout += parseFloat(
            yearData[key].amount.replace(/[^\d.]/g, "")
          );
          // Add to column total
          columnTotals[key] += parseFloat(
            yearData[key].amount.replace(/[^\d.]/g, "")
          );
        } else {
          row[key] = "--";
        }
      }
    }
    row["ANNUAL_PAYOUT"] = annualPayout;
    rowData.push(row);
  }

  // Add totals row
  const totalRow = { YEAR: "Totals" };
  for (const key of columnKeys) {
    if (key !== "YEAR") {
      totalRow[key] = columnTotals[key];
    }
  }
  totalRow["ANNUAL_PAYOUT"] = Object.values(columnTotals).reduce(
    (acc, curr) => acc + curr,
    0
  );
  rowData.push(totalRow);

  return rowData;
};
