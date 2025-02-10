import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createStyleHook, VariantPropsOfStyleHook } from './utils/createStyleHook';

type Variant<T extends object> = (props?: T) => string


const useStyles = createStyleHook<
  { width: number },
  {
    btn: Variant<{ size?: "md" | "lg" }>;
    container: Variant<{ color?: "red" | "blue", size?: "md" | "lg" }>;
  }
>(({ tv, context }) => {
  return {
    btn: tv({
      base: "p-1 rounded",
      variants: {
        size: {
          md: `w-[${context.width}px]`,
          lg: "w-[200px]",
        },
      },
      defaultVariants: {
        size: "md",
      },
    }),
    container: tv({
      base: "p-1",
      variants: {
        color: {
          red: "bg-red-500",
          blue: "bg-blue-500",
        },
        size: {
          md: `w-[${context.width}px]`,
          lg: "w-[200px]",
        },
      },
      defaultVariants: {
        color: "blue",
      },
    }),
  };
});


type Props = VariantPropsOfStyleHook<typeof useStyles>;

function App(props: Props) {
  const [count, setCount] = useState(0)

  const s  = useStyles({ width: 100 });

  s.btn({ size: 'md' })

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
