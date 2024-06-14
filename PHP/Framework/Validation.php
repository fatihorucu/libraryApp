<?php

namespace Framework;

class Validation
{
    /**
     * Check if the string is valid
     * 
     * @param string $value
     * @param int $min
     * @param int $max
     * 
     * @return bool
     */
    public static function isStringValid($value, $min = 1, $max = INF)
    {
        if (is_string($value)) {
            $trimmedValue = trim($value);
            $length = strlen($trimmedValue);
            return $length >= $min && $length <= $max;
        } else {
            return false;
        }
    }
    /** 
     * Check if the mail is valid
     *  
     * @param string $value
     * @return mixed
     */
    public static function isEmailValid($value)
    {
        $trimmedValue = trim($value);

        return filter_var($trimmedValue, FILTER_VALIDATE_EMAIL);
    }

    /**
     * Check if the values matching
     * 
     * @param string $value1
     * @param string $value2
     * 
     * @return bool
     */
    public static function isMatching($value1, $value2)
    {
        return trim($value1) === trim($value2);
    }
}
