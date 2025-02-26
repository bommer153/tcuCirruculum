<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Subjects;

class SubjectController extends Controller
{
    public function index(){

        $subjects = subjects::get();
        return Inertia::render('subject/index',[
            'subjects' => $subjects
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'subjectCode' => 'string|required',
            'subjectDescription' => 'string|required',
        ]);

       
        $insertSubject = Subjects::create($request->all());    
        return to_route('subject.index');
    }
}
