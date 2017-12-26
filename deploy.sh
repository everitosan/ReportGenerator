#!/bin/sh

## should be run as "git deploy [path]"
if [ -z "$1" ]
then
  echo "Please specofy the dir of the dist project"
  exit 1
fi
npm run build
sed -i -e 's/static/ReportGenerator\/static/g' ./$1/static/js/app.*.js
sed -i -e 's/\/static/static/g' ./$1/index.html
git subtree push --prefix $1 origin gh-pages
