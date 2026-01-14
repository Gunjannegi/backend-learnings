import { useMemo } from "react";
import ReportTable from "./ReportTable";

const getMonthLabel = (dateStr) =>
  new Date(dateStr).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

const MonthlyReport = ({ expenses }) => {
  const monthlyReportArray = useMemo(() => {
    if (!Array.isArray(expenses)) return [];

    const grouped = expenses.reduce((acc, curr) => {
      const key = `${new Date(curr.date).getFullYear()}-${new Date(
        curr.date
      ).getMonth()}`;

      if (!acc[key]) {
        acc[key] = { label: getMonthLabel(curr.date), amount: 0 };
      }

      acc[key].amount += curr.amount;
      return acc;
    }, {});

    return Object.values(grouped);
  }, [expenses]);

  return (
    <ReportTable
      title="Monthly Expense Report"
      columnLabel="Month"
      data={monthlyReportArray}
    />
  );
};

export default MonthlyReport;
