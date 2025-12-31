package com.waterfilter.water.exception;

public class TooManyRequestsException extends RuntimeException{

  public TooManyRequestsException(String message){
    super(message);
  }
}
