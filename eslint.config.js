import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'boundaries',
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],


    'boundaries/element-types': [2, {
      default: 'disallow',
      rules: [
        // 各レイヤーを定義
        {
          from: 'icons',
          allow: ['icons']
        },
        {
          from: 'atoms',
          allow: ['icons', 'atoms']
        },
        {
          from: 'forms',
          allow: ['icons', 'atoms', 'forms']
        },
        {
          from: 'molecules',
          allow: ['icons', 'atoms', 'forms', 'molecules']
        },
        {
          from: 'organisms',
          allow: ['icons', 'atoms', 'forms', 'molecules', 'organisms']
        },
        {
          from: 'pageTemplate',
          allow: ['icons', 'atoms', 'forms', 'molecules', 'organisms', 'pageTemplate']
        },
        {
          from: 'appLayouts',
          allow: ['icons', 'atoms', 'forms', 'molecules', 'organisms', 'pageTemplate', 'appLayouts']
        },
        // utils / extensions は例外的にどこからでも OK とする想定
        {
          from: 'utils',
          allow: ['icons','atoms','forms','molecules','organisms','pageTemplate','appLayouts','extensions','utils']
        },
        {
          from: 'extensions',
          allow: ['icons','atoms','forms','molecules','organisms','pageTemplate','appLayouts','extensions','utils']
        },
      ],
    }],

    'boundaries/entry-point': [2, {
      default: 'allow',
    }],

    'boundaries/no-private': 2,
    'boundaries/no-unknown': 2
  },
  settings: {
    boundaries: {
      // どのフォルダがどのレイヤーか定義
      // 例えば src/xxxx というディレクトリ構造
      // "type" で先ほどのルールの "from" 部分に対応
      "levels": [
        { "type": "icons", "pattern": "src/icons" },
        { "type": "atoms", "pattern": "src/atoms" },
        { "type": "forms", "pattern": "src/forms" },
        { "type": "molecules", "pattern": "src/molecules" },
        { "type": "organisms", "pattern": "src/organisms" },
        { "type": "pageTemplate", "pattern": "src/pageTemplate" },
        { "type": "appLayouts", "pattern": "src/appLayouts" },
        { "type": "extensions", "pattern": "src/extensions" },
        { "type": "utils", "pattern": "src/utils" },
      ]
    }
    },
  },
)
