<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\User;
use GuzzleHttp\Client;

class LoginController extends Controller
{
   
    public function authenticate(Request $request)
    {

        $email = $request->email;
        $password = $request->password;

        $hashedPassword = DB::table('users')->where('email', $email)->value('password');

        if(Hash::check($password, $hashedPassword)){
            $client = DB::table('oauth_clients')->where('password_client', 1)->first();
            $http = new Client;
            $url = env('APP_URL') . '/oauth/token';
            $response = $http->post($url, [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => $client->id,
                    'client_secret' => $client->secret,
                    'username' => $email,
                    'password' => $password,
                    'scope' => ''
                ]
            ]);

            return json_decode((string) $response->getBody(), true);

        }else {

            return response('Auth Error', 401);
        }
    }


}
