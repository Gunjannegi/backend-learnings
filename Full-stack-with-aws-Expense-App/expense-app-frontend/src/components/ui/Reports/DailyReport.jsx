import { useMemo } from "react";
import ReportTable from "./ReportTable";

const DailyReport = ({ expenses }) => {
  const dailyReportArray = useMemo(() => {
    if (!Array.isArray(expenses)) return [];

    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.date] = (acc[curr.date] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([date, amount]) => ({
        label: new Date(date).toDateString(),
        amount,
      }))
      .sort((a, b) => new Date(b.label) - new Date(a.label));
  }, [expenses]);

  return (
    <ReportTable
      title="Daily Expense Report"
      columnLabel="Date"
      data={dailyReportArray}
    />
  );
};

export default DailyReport;
