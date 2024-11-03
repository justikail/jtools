export function download(source, title, ext) {
  const url = `${process.env.NEXT_PUBLIC_PRIMARY_URL}/api/downloader?s=${source}&t=${title}&e=${ext}`;
  window.open(url, "_blank");
}
