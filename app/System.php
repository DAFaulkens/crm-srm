<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class System extends Model
{
    
    public function vendors(){
        return $this->hasMany('App\Vendor');
    }
}
