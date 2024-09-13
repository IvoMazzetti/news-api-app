FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    jpegoptim optipng pngquant gifsicle \
    zip \
    unzip \
    git \
    curl && \
    docker-php-ext-install pdo pdo_mysql


RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . .

RUN composer install && \
    php artisan key:generate && \
    php artisan optimize && \
    php artisan config:cache && \
    php artisan view:cache && \
    php artisan view:clear

RUN chmod -R gu+w /var/www/html/storage \
    && chmod -R guo+w /var/www/html/storage

RUN groupadd --force -g 1000 sail
RUN useradd -ms /bin/bash --no-user-group -g 1000 -u 1337 sail

CMD ["php-fpm"]
