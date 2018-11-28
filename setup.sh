#!/bin/bash

export PATH=/root/.nvm/versions/node/v10.10.0/bin:$PATH

cd mtgroom-opencv/

/usr/bin/git pull origin master
/usr/bin/git reset --hard

npm install
forever start run.js