export const formatXCD = (cents: number) =>
  `EC$${(cents / 100).toFixed(2)}`;

export const isStoreOpen = (openTime: string, closeTime: string) => {
  const now = new Date();
  const [oh, om] = openTime.split(":").map(Number);
  const [ch, cm] = closeTime.split(":").map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= oh * 60 + om && mins < ch * 60 + cm;
};
