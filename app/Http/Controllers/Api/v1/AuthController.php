<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $credentials = $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('name', $credentials['name'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {

            throw ValidationException::withMessages([
                'name' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->name . random_int(111, 999);

        $expirationDate =  Carbon::now()->addDay(30);
        $user->update([
            'token' => $token,
            'expired_token' => $expirationDate,
        ]);

        return response()->json(['success' => true, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $token = User::where('token', $request->token)->first();

        if ($token) {
            $token->update([
                'token' => null,
                'expired_token' => null,
            ]);

            return response()->json(['message' => 'Token deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Token not found'], 404);
        }
    }

    public function getUser(Request $request)
    {
        $hashedToken = 'aceb733dcad166a356b5de1b20d37208a473edb01a603dbc1d298f00a0751ab5';

        // Retrieve the personal access token
        $token = PersonalAccessToken::where('token', $hashedToken)->first();

        // If token exists and is associated with a user
        if ($token && $token->tokenable_type === 'App\Models\User') {
            $user = $token->tokenable;

            return response()->json([
                'success' => true,
                'user' => $user,
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User not found for the given token',
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
