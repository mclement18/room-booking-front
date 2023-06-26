export default function joinUrl(baseUrl: string, ...args: string[]): string {
  baseUrl = baseUrl.trim();
  baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  return (
    baseUrl +
    args
      .map((arg) => {
        arg = arg.trim();
        return arg.startsWith('/') && arg.endsWith('/')
          ? arg.slice(1, arg.length - 1)
          : arg.startsWith('/')
          ? arg.slice(1)
          : arg.endsWith('/')
          ? arg.slice(0, arg.length - 1)
          : arg;
      })
      .join('/')
  );
}
