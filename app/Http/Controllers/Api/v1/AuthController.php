<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Carbon;

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

    public function getUser(string $token)
    {
        $user = User::where('token', $token)->first();

        return $user;
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|different:current_password',
            'confirm_password' => 'required|string|same:new_password',
        ]);

        $user = User::where('token', $request->token)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password does not match'], 401);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }
}
