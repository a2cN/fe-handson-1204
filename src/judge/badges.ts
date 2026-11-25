// 獲得したバッジの保存(ブラウザの localStorage)。再読み込みしても消えない。

const STORAGE_KEY = 'tanstack-query-handson:badges'
const listeners = new Set<() => void>()

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

let earned = load()

function save(next: string[]) {
  earned = next
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  listeners.forEach((l) => l())
}

export const badgeStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot: () => earned,
  add(ids: string[]) {
    const next = [...new Set([...earned, ...ids])]
    if (next.length !== earned.length) save(next)
  },
  reset() {
    save([])
  },
}
