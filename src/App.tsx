import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createStyleHook, VariantPropsOfStyleHook } from './utils/createStyleHook';
import { tv } from 'tailwind-variants';


const useStyles = createStyleHook<{ width: number }, {
  btn: ReturnType<typeof tv>;
  container: ReturnType<typeof tv>;
}>(({ tv, merge, width }) => {
  // ここでは、userCtx の値（例: width）を利用して条件に応じたスタイル定義も可能です。
  // ※ 以下は一例です。width を直接利用する例として、width に応じた背景色を選ぶなどのロジックも組めます。
  return {
    btn: tv({
      base: "p-1 rounded",
      variants: {
        size: {
          md: "w-[100px]",
          lg: "w-[200px]",
        },
        // 例: 幅が 100 以上なら bg-blue-500、そうでなければ bg-red-500 とする
        // ※ ここではシンプルに文字列を返す例なので、実際はユーザー側で条件分岐して利用してもよいでしょう
        // color: width >= 100 ? "bg-blue-500" : "bg-red-500"
      },
      defaultVariants: {
        size: "md",
      },
    }),
    container: tv({
      base: "p-1",
      // container 用の variants も必要に応じて定義できます
    }),
  };
});

type Props = VariantPropsOfStyleHook<typeof useStyles>;

function App(props: Props) {
  const [count, setCount] = useState(0)

  const s  = useStyles({ width: 100 });

  s.btn({ size: 'foo' })

  console.log('s', s)
  console.log('s.btn', s.btn({ size: 'md' }))

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
