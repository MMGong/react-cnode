FROM nginx
MAINTAINER michaelgongm "gh1506301420@gmail.com"

COPY ./build/ /usr/share/nginx/html/


EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]