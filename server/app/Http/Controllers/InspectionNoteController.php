<?php

namespace App\Http\Controllers;

use App\Models\InspectionNote;
use Illuminate\Http\Request;

class InspectionNoteController extends Controller
{
    public function index(Request $request)
    {
        return InspectionNote::all();
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

    public function update(Request $request, InspectionNote $insepctionNote)
    {
        $validated = $request->validate([
            'text' => 'required',
        ]);

        $insepctionNote->update($validated);
        return $insepctionNote;
    }

    public function destroy(Request $request, InspectionNote $inspectionNote)
    {
        $inspectionNote->delete();
        return $inspectionNote;
    }

    public function install(Request $request)
    {
        $allNotes = InspectionNote::all()->toJson();
        $contentLength = strlen($allNotes);
        return response($allNotes)->header('Content-Length', $contentLength)->header('Content-Type', 'application/json');
    }
}
