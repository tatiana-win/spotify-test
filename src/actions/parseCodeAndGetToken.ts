export const parseCodeAndGetToken = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search.substring(1));
    const code = params.get('code') ?? '';
    return { code };
}
