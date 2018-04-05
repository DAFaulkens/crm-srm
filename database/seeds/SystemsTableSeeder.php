<?php

use Illuminate\Database\Seeder;
use App\System;

class SystemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(System::class, 10)->create();
    }
}
