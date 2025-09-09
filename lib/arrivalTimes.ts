export const arrivalTimes = Array.from({ length: 7 }, (_, i) => {
  const hour = i + 9; // 09:00 → 15:00
  return {
    label: `${hour.toString().padStart(2, "0")}:00`,
    value: `${hour.toString().padStart(2, "0")}:00`,
  };
});
