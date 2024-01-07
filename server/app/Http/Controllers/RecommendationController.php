<?php

namespace App\Http\Controllers;

use App\Models\Recommendation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RecommendationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|unique:recommendations,text',
        ]);

        $recommendation = new Recommendation($validated);
        $recommendation->save();
        return $recommendation;
    }

    public function update(Request $request, Recommendation $recommendation)
    {
        if ($recommendation['active'] === false) {
            return response()->json(['message' => 'Recommedation does not exists'], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'text' => 'required|unique:recommendations,text',
        ]);

        $recommendation->update($validated);
        return $recommendation;
    }

    public function destroy(Request $request, Recommendation $recommendation)
    {
        if ($recommendation['active'] === false) {
            return response()->json(['message' => 'Recommedation does not exists'], Response::HTTP_NOT_FOUND);
        }

        $recommendation->update(['active' => false]);
        return response()->json(["message" => "Recommedation deleted successfully"]);
    }

    public function install(Request $request)
    {
        $allRecommendations = Recommendation::where('active', true)->get()->toJson();
        $contentLength = strlen($allRecommendations);
        return response($allRecommendations)->header('Content-Length', $contentLength)->header('Content-Type', 'application/json');
    }
}
