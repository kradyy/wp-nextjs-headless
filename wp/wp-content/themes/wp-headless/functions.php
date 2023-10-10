<?php

/**
 * Load all classes using PSR-4 Autoloader.
 * To add a new class, simply add a new file in the inc/ folder and follow the same namespace as the other classes.
 */

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) :
    require_once dirname(__FILE__) . '/vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $dotenv->required(['CACHE_CLEARING_SECRET', 'CACHE_URL']);
endif;

if (class_exists('WP_Headless\\Init')) :
    WP_Headless\Init::register_classes();
endif;