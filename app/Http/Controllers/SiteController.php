<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Site;
use App\Http\Resources\Site as SiteResource;
use App\Http\Resources\Vendor as VendorResource;
use App\Http\Resources\SitesWithVendorsResource;

class SiteController extends Controller
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

        $sites = Site::orderBy($orderField, $direction)->paginate(20);

        if($request->search){
            $searchString = "%$request->search%";
            $sites = Site::where('name', 'like', $searchString)
                ->orderBy($orderField, $direction)
                ->paginate(10); 
        }

        return SiteResource::collection($sites);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $site = new Site;

        $site->name = $request->name;
        $site->address = $request->address;
        $site->phone_number = $request->phone_number;

        $site->save();
        
        $site->load('vendors', 'documents');

        return new SiteResource($site); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $site = Site::findOrFail($id);

        $site->load('vendors', 'documents');

        return new SiteResource($site);
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
        $site = Site::find($id);

        if($site){
           $site->name = $request->name;
           $site->address = $request->address;
           $site->phone_number = $request->phone_number;
        }

        $site->save();

        $site->load('vendors', 'documents');

        return new SiteResource($site);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $site = Site::find($id);

        if(!$site){
            abort(404);
        }

        $site->delete();

        return 'success';
    }

    public function search(Request $request)
    {

        $result = 'No Search found';

        if($request->search){
            $result = 'success';
        }

        return $result;
    }

    public function updateVendors(Request $request, $id)
    {
        $site = Site::findOrFail($id);


        if($site){
            if($request->method == 'attach'){
                $site->vendors()->attach($request->vendorId);
            }
    
            if($request->method == 'detach'){
                $site->vendors()->detach($request->vendorId);
            }
        }

        $site->load('vendors', 'documents');

        return new SiteResource($site); 
       
    }

    public function attachVendor(Request $request, $id, $vendorId)
    {
        $site = Site::findOrFail($id);
        
        if($site){
            $site->vendors()->attach($request->vendorId);

            $site->load('vendors', 'documents');

        }

        return new SiteResource($site);
        
    }

    public function detachVendor(Request $request, $id, $vendorId)
    {
        $site = Site::findOrFail($id);
        
        if($site){
            $site->vendors()->detach($request->vendorId);

            $site->load('vendors', 'documents');
        }

        return new SiteResource($site);
    }


}
