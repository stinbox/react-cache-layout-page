## 検証したこと

次のディレクトリ構造のとき、

```
src/app
├── layout.tsx
├── page.tsx
└── page2
    └── page.tsx
```

`app/layout.tsx`, `app/page.tsx`, `app/page2/page.tsx` が同じ `react/cache` 適用済み非同期関数を呼んでいるとする。 `/` と `/page2` を `next/link` で行き来したらどんな挙動になるのか確認したかった。

なお、すべて SSR(dynamic rendering) とする。

## 検証理由

`react/cache` はコンポーネントツリーで同じ結果を表示するために計算結果をキャッシュするための高階関数。ではページをまたいでも値が使い回されるのか疑問に思った。

## 検証方法

現在時刻を非同期に取得する `react/cache` 適用済み関数を 1 つ用意して、それを `app/layout.tsx`, `app/page.tsx`, `app/page2/page.tsx` が呼ぶようにした。

## 予想

`/` で `app/layout.tsx` と `app/page.tsx` で同じ値が表示される。また、そこから `/page2` に遷移したら `app/layout.tsx` の値は変化せず、`app/page2/page.tsx` の値は `app/layout.tsx` と同じ値が表示される(`react/cache` でキャッシュされた値が再利用される)。

## 結果

`/` では `app/layout.tsx` と `app/page.tsx` で同じ値が表示された。
しかしそこから `/page2` に遷移すると、`app/layout.tsx` の値は変化せず、`app/page2/page.tsx` の値は新たに計算された結果が表示された(`react/cache` でキャッシュされた値は再利用されなかった)。

ついでに、`/page2` から `/` に再度遷移してもクライアントサイドにキャッシュされているため、`app/layout.tsx` と同じ値が `app/page.tsx` に表示された。
