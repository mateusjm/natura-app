export const cleanPhone = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 11); 
};

export const formatPhone = (value: string): string => {
  const digits = cleanPhone(value);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7)}`;
};
