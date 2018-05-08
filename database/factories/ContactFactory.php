<?php

use Faker\Generator as Faker;

$factory->define(App\Contact::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'position' => $faker->title,
        'title' => $faker->title,
        'hotel_id' => $faker->numberBetween($min = 1, $max = 50)

    ];
});
