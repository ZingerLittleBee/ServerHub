export const login = [
  '/login/api',
  (url: string) => fetch(url, { method: 'POST' }).then(r => r.json())
]
