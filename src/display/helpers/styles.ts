export const roundedBorder = (x: number, y: number) => {
  const value = `${x}px ${y}px`;
  return {
    borderEndEndRadius: value,
    borderStartEndRadius: value,
    borderEndStartRadius: value,
    borderStartStartRadius: value,
  }
};

export const sizing = (width: number, height: number, left?: number, top?: number) => {
  return {
    width: `${width}%`,
    height: `${height}%`,
    ...(left ? { left: `${left}%` } : {}),
    ...(top ? { top: `${top}%` } : {}),
  }
};

export const center = (override: {
  alignItems?: string,
  justifyContent?: string
} = {}) => {
  return {
    display: "flex",
    alignItems: override.alignItems || "center",
    justifyContent: override.justifyContent || "center",
  }
};
