#!/bin/bash

# 使用方法 ./deploy.sh <ssh-host-name>
# 比如： ./deploy.sh saas

npm run build
rm -rf lottery-h5.tar.gz
tar zcvf lottery-h5.tar.gz dist

ssh root@${1} "cd /home/www/server/deploy/lottery-h5/ && mv lottery-h5.tar.gz backup"
scp lottery-h5.tar.gz root@${1}:/home/www/server/deploy/lottery-h5/

ssh root@${1} "cd /home/www/server/deploy/lottery-h5/ && \
	    tar xvf lottery-h5.tar.gz &&\
	    sudo chown www:www -R /home/www/server/deploy/lottery-h5"