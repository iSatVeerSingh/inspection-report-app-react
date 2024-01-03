<?php

namespace App\Http\Controllers;

use App\Models\InspectionNote;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InspectionNoteController extends Controller
{
    public function index(Request $request)
    {
        return InspectionNote::where('active', true)->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required'
        ]);

        $insepctionNote = new InspectionNote($validated);
        $insepctionNote->save();
        return $insepctionNote;
    }

    public function update(Request $request, InspectionNote $inspectionNote)
    {
        if ($inspectionNote['active'] === false) {
            return response()->json(['message' => 'Inspection note does not exists'], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'text' => 'required'
        ]);

        $inspectionNote->update($validated);
        return $inspectionNote;
    }

    public function destroy(Request $request, InspectionNote $inspectionNote)
    {
        if ($inspectionNote['active'] === false) {
            return response()->json(['message' => 'Inspection note does not exists'], Response::HTTP_NOT_FOUND);
        }

        $inspectionNote->update(['active' => false]);
        return response()->json(["message" => "Inspection note deleted successfully"]);
    }

    public function install(Request $request)
    {
        $allNotes = InspectionNote::where('active', true)->get()->toJson();
        $contentLength = strlen($allNotes);
        return response($allNotes)->header('Content-Length', $contentLength)->header('Content-Type', 'application/json');
    }
}
