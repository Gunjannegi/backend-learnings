import { useMemo } from "react";
import ReportTable from "./ReportTable";

const getWeekRange = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDay() || 7;

  const start = new Date(date);
  start.setDate(date.getDate() - day + 1);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return `${start.toDateString()} - ${end.toDateString()}`;
};

const WeeklyReport = ({ expenses }) => {
  const weeklyReportArray = useMemo(() => {
    if (!Array.isArray(expenses)) return [];

    const grouped = expenses.reduce((acc, curr) => {
      const label = getWeekRange(curr.date);
      acc[label] = (acc[label] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.entries(grouped).map(([label, amount]) => ({
      label,
      amount,
    }));
  }, [expenses]);

  return (
    <ReportTable
      title="Weekly Expense Report"
      columnLabel="Week"
      data={weeklyReportArray}
    />
  );
};

export default WeeklyReport;
