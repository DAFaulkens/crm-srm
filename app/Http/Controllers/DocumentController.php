<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Document;
use App\Http\Resources\Document as DocumentResource;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        
    }

    public function upload(Request $request)
    {
        $file = $request->file('file');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $bucket = env('AWS_BUCKET');
        
        $s3 = Storage::disk('s3');

        if($s3->put($filename,file_get_contents($file))){
            // return $s3->getDriver()->getAdapter()->getClient()->getObjectUrl($bucket, $filename);
            return $filename;
        }else {

            return null;
        }
    }


    public function download($id)
    {

        $document = Document::findOrFail($id);

        $bucket = env('AWS_BUCKET');
        $s3 = Storage::disk('s3');

        if($document){

            $location = $document->location;

            $file = $s3->get($location);

            $ext = pathinfo($location, PATHINFO_EXTENSION);


            $filename = $document->name . '.' . $ext;

            $headers = [
                'Content-Type' => 'text/csv', 
                'Content-Description' => 'File Transfer',
                'Content-Disposition' => "attachment; filename={$filename}",
                'filename'=> $filename
            ];

            return response($file, 200, $headers);
            

        }else {
            return null;
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
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
