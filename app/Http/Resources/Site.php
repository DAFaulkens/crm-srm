<?php

namespace App\Http\Resources;
// use App\Http\Resources\Vendor as VendorResource;

use Illuminate\Http\Resources\Json\JsonResource;

class Site extends JsonResource
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
            'address' => $this->address,
            'phone_number' => $this->phone_number,
            'vendors' => Vendor::collection($this->whenLoaded('vendors')),
            'documents' => Document::collection($this->whenLoaded('documents'))
        ];
    }
}
