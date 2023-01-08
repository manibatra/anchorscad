#!/bin/sh

if [ -z "$1" ]; then
    echo "No AWS profile specified"
    echo "Usage collect-assets.sh <aws-profile>"
    exit 1
fi

rm -rf public/models
mkdir public/models
find ../src/anchorscad/runner/generated/output/anchorscad/models/ -type f -name '*.png' -exec cp -R --parents {} public/models/ \;
mv public/src/anchorscad/runner/generated/output/anchorscad/models/* public/models/
rm -rf public/src

 aws --profile "$1" s3 cp public/models/ s3://anchorscad/ --recursive --exclude '*.DS_Store*'