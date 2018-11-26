#!/bin/bash

# alias npm='/root/.nvm/versions/node/v10.10.0/bin/npm'
# alias node='/root/.nvm/versions/node/v10.10.0/bin/node'

cd mtgroom-opencv/

/usr/bin/git pull origin master
/usr/bin/git reset --hard

/root/.nvm/versions/node/v10.10.0/bin/npm install
/root/.nvm/versions/node/v10.10.0/bin/forever start /root/mtgroom-opencv/run.js