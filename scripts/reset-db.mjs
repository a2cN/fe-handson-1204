// json-server 用の db.json を、初期データ(db.seed.json)から作り直す。
// 「購入する」(PATCH)で db.json が書き換わるため、起動のたびに元へ戻す。
// Windows でも動くよう、cp コマンドではなく Node で書いている。
import { copyFileSync } from 'node:fs'

copyFileSync(new URL('../db.seed.json', import.meta.url), new URL('../db.json', import.meta.url))
console.log('db.json を初期データに戻しました')
