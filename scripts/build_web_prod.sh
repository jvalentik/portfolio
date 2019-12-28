#!/usr/bin/env bash

flutter clean && flutter build web && cp -r ./web/* ./build/web
