<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Site extends Model
{

    use SoftDeletes;
    
    public function vendors(){
        return $this->belongsToMany('App\Vendor')
            ->using('App\SiteVendor');
    }


    public function systems(){
        return $this->belongsToMany('App\System')->using('App\SiteSystem');
    }


    public function documents(){
        return $this->hasMany('App\Document');
    }

}
