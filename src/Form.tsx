import React from 'react'
import { createRoot } from 'react-dom/client'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'


// ─── 1. Path 型（再帰的にオブジェクト内のキーを文字列ドット表記で抽出） ──────────────────────────────
type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${Path<T[K]>}`
          : `${K}`
        : never
    }[keyof T]
  : never

// ─── 2. フォームスキーマ & 型定義 ──────────────────────────────
const formSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
})
type FormShape = z.infer<typeof formSchema>

// ─── 3. Field コンポーネント ──────────────────────────────
// 外部から見た name プロップは Path<FormShape> として型安全に扱えるようにしています。
export type FieldProps<TFieldValues extends (object & { name: string })> = {
  name: string
  form: ReturnType<typeof useForm<TFieldValues>>
  label?: string
  placeholder?: string
  type?: string
  fullWidth?: boolean
}

export function Field<TFieldValues extends (object & { name: string })>({
  name,
  form,
  label,
  placeholder,
  type = 'text',
  fullWidth = false,
}: FieldProps<TFieldValues>) {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* 入力フィールド */}
      {form.Field({
        // TanStack Form の内部が期待する型と整合させるため、キャストを入れる場合があります
        name,
        children: (field) => (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            // 入力値は <input> の value プロップの型に合わせてキャスト
            value={(field.state.value ?? '') as string}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              field.state.meta.errors ? 'border-red-500' : 'border-gray-300'
            } ${fullWidth ? 'w-full' : ''}`}
          />
        ),
      })}

      {/* エラーメッセージ */}
      {form.Field({
        name: name,
        children: (field) =>
          field.state.meta.errors ? (
            <span className="text-sm text-red-500">
              {String(field.state.meta.errors)}
            </span>
          ) : null,
      })}
    </div>
  )
}

// ─── 4. ユーザーフォームコンポーネント ──────────────────────────────
export const UserForm = () => {
  const form = useForm<FormShape>({
    defaultValues: {
      name: 'aaa',
      email: 'aaa@gmail.com',
    },
    onSubmit: async (values) => {
      console.log('Submitted:', values)
      const result = formSchema.safeParse(values)

      console.log('result:', result)

      if (!result.success) {
        // バリデーションエラー時は各フィールドのエラーを返す
        return result.error.formErrors.fieldErrors
      }
      alert('送信成功！')
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4 p-4 border rounded-md max-w-md mx-auto"
    >
      <Field<FormShape>
        name="name"
        form={form}
        label="名前"
        placeholder="名前を入力"
        fullWidth
      />

      <Field<FormShape>
        name="email"
        form={form}
        label="メールアドレス"
        placeholder="メールアドレスを入力"
        type="email"
        fullWidth
      />

      <button
        type="submit"
        disabled={form.state.isSubmitting}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        送信
      </button>
    </form>
  )
}

// ─── 5. ルートコンポーネント ──────────────────────────────
const App = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <UserForm />
  </div>
)

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<App />)
}
