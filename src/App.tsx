import './App.css';
import { UserForm } from './Form';



function App() {
  return (
    <>
    <UserForm />
    </>
  )
}

export default App


| ライブラリ         | 特徴                                                         | デフォルトスタイル          | 内部技術                          | カスタマイズの自由度 | 備考                                                   |
|-------------------|--------------------------------------------------------------|---------------------------|-----------------------------------|---------------------|--------------------------------------------------------|
| React Spectrum    | フルフィーチャーなUIライブラリ。Adobeのデザインガイドラインに基づく統一感あるUIを提供。 | 既定のデザインが付属       | React Aria, React Stately         | 中～低              | 一貫性と堅牢性を重視。デザインの上書きは難しく、Tailwindとの併用は工夫が必要。 |
| Ariakit          | React Hooksベースのアクセシブルなコンポーネント群。必要最小限のスタイルで実装が容易。     | 最小限のスタイル           | 独自実装（React Ariaの考え方を踏襲） | 高                  | シンプルで柔軟。Tailwindなどで自由に装飾でき、迅速な開発が可能。         |
| Radix UI         | スタイルレスでアクセシブルなプリミティブコンポーネント群。                         | 基本的に無し              | 独自実装（アクセシビリティ重視）      | 高                  | 細かい調整が可能。UI設計の自由度が高く、低レベルのカスタマイズに最適。       |
| Headless UI      | 完全にヘッドレスなコンポーネント。Tailwind Labs製。                                | なし                     | 独自実装                          | 非常に高             | Tailwindとの連携は抜群。ただし、方針に合わない場合もあり得る。              |
| React Stately    | 状態管理に特化。React Ariaと組み合わせて利用することでアクセシブルな挙動を実現。       | 該当なし（単体ではUIを提供しない） | React Ariaとの連携が基本           | 高                  | 単体ではコンポーネントではなく、あくまで状態管理ライブラリ。React Aria等と併用する。 |
