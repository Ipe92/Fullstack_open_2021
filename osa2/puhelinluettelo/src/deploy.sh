#!/bin/sh
npm run build
rm -rf ../../osa3/puhelinluettelo/build
cp -r build ../../osa3/puhelinluettelo/