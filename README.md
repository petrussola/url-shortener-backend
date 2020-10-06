This project is the backend of a url-shortener using [this architecture](https://dev.to/petrussola/building-a-url-shortener-my-architecture-57lb).

## Usage

It supports signup, sign in and management, url-shortening (of course), url-directioning (so the short url can redirect the the real url), and User management capabilities for the admin User.

## ENV Variables

DATABASE_DEV_URL={{LINK TO LOCAL DATABASE}}
NODE_ENV=development
CHARS=1234567890abcdefghijklmnopqrstuvwxyz <-- how many chars are used to craft the short url
LENGTH=5 <-- length of the short url 
JWT_SECRET={{JWT SECRET}
DEV_FRONTEND_URL={{LOCAL DEVELOPMENT URL FOR FRONTEND}}
CSRF_PROTECTION_HOST=localhost
