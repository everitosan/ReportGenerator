#!/bin/sh

if [ -z "$1" ]
then
  echo "Please specify the dir of the dist project"
  exit 1
elif [ -z "$2" ]
then
  echo "Please write the version of Deploy"
  exit 1
fi
npm run build
sed -i -e 's/static\/img/ReportGenerator\/static\/img/g' ./$1/static/js/app.*.js
sed -i -e 's/\/static/static/g' ./$1/index.html
git add .
git commit -m "Release V: $2"
git subtree push --prefix $1 origin gh-pages
