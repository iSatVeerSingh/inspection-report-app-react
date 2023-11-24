<?php

namespace App\Http\Controllers;

use App\Http\Resources\InspectionNoteCollection;
use App\Http\Resources\InspectionNoteResource;
use App\Models\InspectionNote;
use Illuminate\Http\Request;

class InspectionNoteController extends Controller
{
    public function index(Request $request)
    {
        return new InspectionNoteCollection(InspectionNote::all());
    }

    // Create Inspection Note
    public function store(Request $request)
    {
        //ToDo: Create a rule to validate if category is number
        $validated = $request->validate([
            'category' => "sometimes|required",
            'text' => "required|max:255"
        ]);

        $inspectionNote = new InspectionNote($validated);
        $inspectionNote->save();

        return new InspectionNoteResource($inspectionNote);
    }
}
