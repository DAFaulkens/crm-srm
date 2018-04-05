<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Vendor extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'support_number' => $this->support_number,
            'support_email' => $this->support_email,
            'system' => $this->system->name,
            'system_id' => $this->system_id
        ];
    }
}
