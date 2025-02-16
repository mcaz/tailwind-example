export default [
  {
    files: ["src/**/*.{js,ts}"],
    plugins: { import: require("eslint-plugin-import") },
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          // zones 配列の中で target から from へのインポートを禁止できる
          zones: [
            {
              target: "./src/components/atoms",
              from: "./src/components/molecules",
              message: "atoms は molecules を import できません"
            },
            // 他にも必要に応じて追加
          ]
        }
      ]
    }
  }
];
