export function roundedBorder(x: number, y: number) {
  const value = `${x}em ${y}em`;
  return {
    borderEndEndRadius: value,
    borderStartEndRadius: value,
    borderEndStartRadius: value,
    borderStartStartRadius: value,
  }
};

export function sizing(width: number, height: number, left?: number, top?: number) {
  return {
    width: `${width}%`,
    height: `${height}%`,
    ...(left ? { left: `${left}%` } : {}),
    ...(top ? { top: `${top}%` } : {}),
  }
};

export function center(override: {
  alignItems?: string,
  justifyContent?: string
} = {}) {
  return {
    display: "flex",
    alignItems: override.alignItems || "center",
    justifyContent: override.justifyContent || "center",
  }
};

export function leftShadow() {
  return {
    boxShadow: "-0.14em 0 0.05em rgba(0, 0, 0, 0.4)",
  }
};
