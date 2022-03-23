#!/bin/bash
mc_cmd() {
        mc ls $1 | awk '{print $5}'
}

for i in $(mc_cmd $1); do
    echo "--------start----------------"
    echo ${i::-1}
    file=$(mc ls iow/geoconnex/summoned/$i | head -1 | awk '{print $6}')

    echo $file
    mc cp iow/geoconnex/summoned/${i::-1}/$file   ${i::-1}.jsonld
    # echo $i
    # mc cat $1/$i | jq .
    echo "--------end------------------"
done
