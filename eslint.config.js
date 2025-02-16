// .eslintrc.js
const layers = [
  { name: 'atoms', pattern: '~/components/atoms/**' },
  { name: 'molecules', pattern: '~/components/molecules/**' },
  { name: 'organisms', pattern: '~/components/organisms/**' },
  { name: 'templates', pattern: '~/components/templates/**' },
  { name: 'pages', pattern: '~/pages/**' },
  // 他のレイヤーも追加可能
];

// 各レイヤーからは、同じレイヤーやそれより下位のレイヤーのみインポートを許可するルールを生成
const boundariesRules = layers.map((layer, index) => ({
  from: layer.name,
  // ここでは、上位から順に許可する例：たとえば、atomsはそれだけ、moleculesはatomsとmolecules、…など
  allow: layers.slice(0, index + 1).map(l => l.name),
}));

export default [
  {
    plugins: ["boundaries"],
    settings: {
      boundaries: {
        default: "disallow", // 明示的に許可していない場合はインポート禁止
        rules: boundariesRules,
        // パターンの設定もできるので、必要に応じて各レイヤーに対して pattern を利用することも可能
      },
    },
    rules: {
      "boundaries/element-types": "error",
    },
    // 対象ファイルの指定（必要に応じて調整）
    files: ["src/**/*.{js,jsx,ts,tsx}"],
  },
];
