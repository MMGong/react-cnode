FROM nginx
MAINTAINER michaelgongm "gh1506301420@gmail.com"

COPY ./build/ /usr/share/nginx/html/
COPY ./vhost.nginx.conf /etc/nginx/conf.d/cnode-react.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]