<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index (Request $request) {
        return new UserCollection(User::all());
    }

    public function show (Request $request, User $user){
        return new UserResource($user);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name'=>'required|max:255',
            'email'=>'required|email|max:255|unique:users,email',
            'phone'=>'required|max:15',
            'password'=>'required',
            'role'=>'required|in:inspector,admin,owner'
        ]);

        $user = new User($validated);
        $user->save();

        return new UserResource($user);
    }

    public function update(Request $request, User $user){
        $validated = $request->validate([
            'name'=> 'sometimes|required',
            'email'=> 'sometimes|email|required',
            'phone'=> 'sometimes|required',
            'password'=> 'sometimes|required',
            'role'=> 'sometimes|in:inspector,admin,owner'
        ]);

        $user->update($validated);

        return new UserResource($user);
    }

    public function destroy (Request $request, User $user){
        $user->delete();
        return response()->noContent();
    }
}
