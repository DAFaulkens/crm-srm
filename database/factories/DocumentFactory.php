<?php

use Faker\Generator as Faker;

$factory->define(App\Document::class, function (Faker $faker) {
    return [
        'name' => $faker->bothify('Document ###??'),
        'description' => $faker->text($maxNbChars = 50),
        'location' => $faker->bothify('http://aws.cdn.????/Document###??.pdf'),
        'site_id' => $faker->numberBetween($min = 1, $max = 10)
    ];
});
