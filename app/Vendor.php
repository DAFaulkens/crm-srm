<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    
    public function system(){
        return $this->belongsTo('App\System');
    }

}
