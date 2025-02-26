<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SubjectController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('subjects', [SubjectController::class, 'index'])->name('subject.index');
    Route::post('subjects', [SubjectController::class, 'store'])->name('subject.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
