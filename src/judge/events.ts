// 判定に使う「画面で起きたこと」の記録(編集しなくてよい)。
// 課題のページ(src/mission/)で起きたことだけを記録する。

export type JudgeEvent =
  | 'list-loading-shown' // 一覧で、useQuery の読み込み中に「読み込み中」が出た
  | 'list-error-shown' // 一覧で、useQuery がエラーのときに「エラー」が出た
  | 'list-returned-without-refetch' // 詳細から一覧に戻ったとき、一覧のリクエストが出なかった

const events = new Set<JudgeEvent>()
const searchedKeywords = new Set<string>()

export const judgeEvents = {
  record(event: JudgeEvent) {
    events.add(event)
  },
  has(event: JudgeEvent) {
    return events.has(event)
  },
  recordKeyword(keyword: string) {
    const k = keyword.trim()
    if (k) searchedKeywords.add(k)
  },
  keywords() {
    return [...searchedKeywords]
  },
}
