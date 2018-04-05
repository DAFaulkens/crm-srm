<?php

use Faker\Generator as Faker;

$factory->define(App\Contact::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'phone' => $faker->phoneNumber,
        'email' => $faker->unique()->safeEmail,
        'vendor_id' => $faker->numberBetween($min = 1, $max = 30),
        'site_id' => $faker->numberBetween($min = 1, $max = 20)
    ];
});
