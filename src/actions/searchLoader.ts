export async function searchLoader() {
  const search = window.location.search;
  const params = new URLSearchParams(search.substring(1));
  const q = params.get("q") ?? "";

  return { q };
}
