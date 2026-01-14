export const getWeekKey = (dateStr) => {
  const date = new Date(dateStr);
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start;
  const week = Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${week}`;
};

export const getMonthKey = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

