#! /bin/bash

for i in {1..100}
do
    OUT=$(node gacha_algorithm.js)
    printf "Test %d: %s\n\n\n" "$i" "$OUT"
done