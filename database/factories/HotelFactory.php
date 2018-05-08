<?php

use Faker\Generator as Faker;

$factory->define(App\Hotel::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'address' => $faker->address
    ];
});
