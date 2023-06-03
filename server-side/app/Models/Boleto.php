<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boleto extends Model
{
    use HasFactory;
    protected $fillable = [ 
        'mensagem_adicional',
        'numero_destino',
        'data_envio',
        'nome_arquivo'
    ];
}
