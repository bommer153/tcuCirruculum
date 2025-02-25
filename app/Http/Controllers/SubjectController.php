<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index(){
        return Inertia::render('subject/index');
    }
}
