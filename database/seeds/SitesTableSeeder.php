<?php

use Illuminate\Database\Seeder;
use App\Site;

class SitesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Site::class, 20)->create();
    }
}
