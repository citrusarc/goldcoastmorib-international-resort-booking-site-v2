export const earlyCheckIn = Array.from({ length: 7 }, (_, i) => {
  const hour = i + 9;
  return {
    label: `${hour.toString().padStart(2, "0")}:00`,
    value: `${hour.toString().padStart(2, "0")}:00`,
  };
});
