#!/bin/bash
tsc --build --force tsconfig.generate.json
# hard code，因為 tsconfig 不知道該怎麼設定比較正確，先短解用 sed 處理掉副檔名問題
if [[ "$(uname)" == "Darwin" ]]; then
  # macOS 使用 BSD 版的 sed，需加上空的引號
  sed -i '' 's/router\/route/router\/route.js/' dist-generate-html/generate-pages.js
else
  # Linux 使用 GNU 版的 sed，不需要空的引號
  sed -i 's/router\/route/router\/route.js/' dist-generate-html/generate-pages.js
fi
node dist-generate-html/generate-pages.js
rm -rf dist-generate-html
