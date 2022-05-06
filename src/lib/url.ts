function simplifyUrl(url: string) {
  return new URL(url).host;
}

export { simplifyUrl };
