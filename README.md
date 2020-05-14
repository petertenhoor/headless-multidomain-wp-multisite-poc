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
127.0.0.1 hans.test
127.0.0.1 www.hans.test
127.0.0.1 klaas.test
127.0.0.1 www.klaas.test
```

## Insights

1. Headless multidomain WP multisite in one application will work. The following has to be done to use it in production:
    - Connect a real Wordpress multisite
    - Add hreflang tags when pages within multisite are connected
    - Build a language switcher (default home link or connected post)
    - Other generic stuff like serving the correct sitemap etc
2. Local Nginx reverse proxies are a thing (Build your own ValetPlus for node.js)
3. Passing headers via Nginx is more solid than matching hostNames (Thanks Tom).
4. New next.js features
    - Built in .env support (in client)
    - No more fetch import needed
    - Import aliases using jsconfig.json
5. New redux approach (next-redux-wrapper V6)
    - New debug feature
    - No more <Provider/> component in _app.js
    - Using React hooks to fetch data from state and dispatch actions (no more connect)