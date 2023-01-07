#!/bin/sh

rm -rf public/models/*
find ../src/anchorscad/runner/generated/output/anchorscad/models/ -type f -name '*.png' -exec cp -R --parents {} public/models/ \;
mv public/src/anchorscad/runner/generated/output/anchorscad/models/* public/models/
rm -rf public/src