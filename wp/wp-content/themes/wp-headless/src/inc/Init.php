<?php

namespace WP_Headless;

final class Init
{
    /**
     * Store all the classes inside an array.
     *
     * @return array Full list of classes
     */
    public static function get_services(): array
    {
        return [
            Core\Disable::class,
            Theme\Appearance::class,
            Theme\Gutenberg::class,
        ];
    }

    /**
     * Loop through the classes, initialize them, 
     * and call the register() method if it exists.
     */
    public static function register_classes(): void
    {
        array_map(
            fn($class) => self::initialize_and_register($class),
            self::get_services()
        );
    }

    /**
     * Initialize the class and call its register method if it exists.
     *
     * @param string $class Class from the services array.
     */
    private static function initialize_and_register(string $class): void
    {
        $service = new $class();
        
        if (method_exists($service, 'register')) {
            $service->register();
        }
    }
}