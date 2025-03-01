<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Subjects;

class SubjectController extends Controller
{
    public function index(){

        $subjects = subjects::get();
        return Inertia::render('subject/index',props: [
            'subjects' => $subjects
        ]);
    }

    public function edit (Subjects $subject){
     
        return Inertia::render('subject/edit', props: [
            'subjects' => $subject
        ]);
    }

    public function update (Request $request,Subjects $subject){     
        $request->validate([
            'subjectCode' => 'string|required',
            'subjectDescription' => 'string|required',
        ]);

        $subject->update($request->all());
        return to_route('subjects.index')->with('success','Subject Updated');
    }
    public function store(Request $request){
        $request->validate([
            'subjectCode' => 'string|required',
            'subjectDescription' => 'string|required',
        ]);

       
        $insertSubject = Subjects::create($request->all());    
        return to_route('subjects.index')->with('success', 'Subject Added');
    }
}
