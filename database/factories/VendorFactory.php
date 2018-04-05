<?php

use Faker\Generator as Faker;

$factory->define(App\Vendor::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'support_number' => $faker->phoneNumber,
        'support_email' => $faker->unique()->safeEmail,
        'system_id' => $faker->numberBetween($min = 1, $max = 10)
    ];
});
