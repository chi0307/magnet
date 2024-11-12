find . -type f -name "*.html" ! -path "./index.html" ! -path "./public/*" -exec rm {} \;
rm -rf dist
rm -rf dist-generate-html
find . -type d -empty -depth -exec rmdir {} \;
