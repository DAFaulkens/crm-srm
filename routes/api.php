<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('sites', 'SiteController@index');
Route::post('sites', 'SiteController@store');
Route::get('sites/{id}', 'SiteController@show');
Route::put('sites/{id}', 'SiteController@update');
Route::delete('sites/{id}', 'SiteController@destroy');

Route::get('vendors', 'VendorController@index');
Route::get('vendors/{id}', 'VendorController@show');
Route::put('vendors/{id}', 'VendorController@update');

Route::get('systems', 'SystemController@index');
Route::get('systems/{id}', 'SystemController@show');    