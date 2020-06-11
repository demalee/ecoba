<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class MessageFacade extends Facade
{
    /**
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'Message';
    }
}
