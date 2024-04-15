<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // $response->headers->set('Access-Control-Allow-Origin', '*');
        // $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // return $response;
        $response = $next($request);

        $origin = env('FRONTEND_URL');

        $response->headers->set('Access-Control-Allow-Origin', $origin); // Adjust origin
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, X-Requested-With', 'X-PINGOTHER', 'Authorization', 'token');
        $response->headers->set('Access-Control-Allow-Expose-Headers', '*'); // Expose additional headers if necessary
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        return $response;
    }
}
