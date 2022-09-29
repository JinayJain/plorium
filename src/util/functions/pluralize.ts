export default function pluralize(
  count: number,
  singular: string,
  suffix = "s",
) {
  return `${count} ${singular}${count === 1 ? "" : suffix}`;
}
