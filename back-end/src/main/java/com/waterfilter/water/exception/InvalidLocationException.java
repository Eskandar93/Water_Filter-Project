package com.waterfilter.water.exception;

import lombok.Getter;

@Getter
public class InvalidLocationException extends RuntimeException{

  private final double distance;
  private final double allowedDistance;

  public InvalidLocationException(String message,  double distance, double allowedDistance){
    super(message);
    this.distance = distance;
    this.allowedDistance = allowedDistance;
  }
}
