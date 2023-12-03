<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return new UserCollection(User::paginate());
    }

    public function show(Request $request, User $user)
    {
        return new UserResource($user);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'phone' => 'required|max:15',
            'password' => 'required',
            'role' => 'required|in:Inspector,Admin,Owner'
        ]);

        $user = new User($validated);
        $user->save();

        return new UserResource($user);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required',
            'email' => 'sometimes|required|email|unique:users,email',
            'phone' => 'sometimes|required',
            'password' => 'sometimes|required',
            'role' => 'sometimes|in:Inspector,Admin,Owner'
        ]);

        $user->update($validated);

        return response()->json(['message' => 'User updated successfully']);
    }

    public function destroy(Request $request, User $user)
    {

        if (Auth::id() === $user['id']) {
            return response()->json(['message' => "Can not delete yourself"], 400);
        }

        $user->delete();
        return response()->noContent();
    }
}
