<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class SitesWithVendorsResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
         // Eager load
         $this->resource->load('vendors');

        // return parent::toArray();
        return new Site($this->resource);

    }
}
