# headless-multidomain-wp-multisite-poc
Proof of concept for a headless multisite WordPress setup running on multiple (sub)domains.

## Set up local nginx to reverse proxy multiple domains to one port

```
vim /usr/local/etc/nginx/nginx.conf
```

Add the following line within the http block:

```
include /Users/petertenhoor/sites/headless-multidomain-wp-multisite-poc/nginx/*;
```

Test the config. Output should be -> nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok

```
nginx -t
```

Restart nginx

```
sudo nginx -s stop && sudo nginx
```

## Set up hosts file

```
127.0.0.1 hans.node
127.0.0.1 www.hans.node
127.0.0.1 klaas.node
127.0.0.1 www.klaas.node
```