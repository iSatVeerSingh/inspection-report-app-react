<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return new UserCollection(User::paginate());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'phone' => 'sometimes|required|max:15',
            'role' => 'required|in:Inspector,Admin,Owner',
            'password' => 'required'
        ]);

        $user = new User($validated);
        $user->save();

        return response()->json(['message' => 'User created successfully'], Response::HTTP_CREATED);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|max:255',
            'email' => 'sometimes|required|email|max:255|unique:users,email',
            'phone' => 'sometimes',
            'role' => 'sometimes|in:Inspector,Admin,Owner',
            'password' => 'sometimes|required'
        ]);

        $user->update($validated);
        return response()->json(['message' => 'User updated successfully']);
    }

    public function destroy(Request $request, User $user)
    {
        if (Auth::id() === $user['id']) {
            return response()->json(['message' => 'Can not delete yourself'], Response::HTTP_BAD_REQUEST);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
