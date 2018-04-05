<?php

use Faker\Generator as Faker;

$factory->define(App\System::class, function (Faker $faker) {
    return [
        'name' => $faker->bothify('Application ###??'),
        'description' => $faker->text($maxNbChars = 50)
    ];
});
