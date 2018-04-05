<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Vendor as VendorResource;
use App\Vendor;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $orderField = 'name';
        $direction ='asc';

        if($request->order){
            $orderField = $request->order;
        }

        if($request->direction){
            $direction = $request->direction;
        }

        $vendors = Vendor::orderBy($orderField, $direction)->paginate(20);

        if($request->search){
            $searchString = "%$request->search%";
            $vendors = Vendor::where('name', 'like', $searchString)
                ->orderBy($orderField, $direction)
                ->paginate(20); 
        }

        // $vendors = Vendor::all();

        return VendorResource::collection($vendors);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $vendor = Vendor::findOrFail($id);

        return new VendorResource($vendor);


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $vendor = Vendor::findOrFail($id);

        if($vendor){
            $vendor->name = $request->name;
            $vendor->support_number = $request->support_number;
            $vendor->support_email = $request->support_email;
            $vendor->system_id = $request->system_id;
        }

        $vendor->save();

        return new VendorResource($vendor);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
