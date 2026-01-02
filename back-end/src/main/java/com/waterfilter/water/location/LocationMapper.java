package com.waterfilter.water.location;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

@Service
public class LocationMapper {
  public LocationDto toLocationDto(Location location){
    if(location == null) return null;

    return LocationDto.builder()
    .latitude(location.getLatitude())
    .longitude(location.getLongitude())
    .build();
  }

  public Location toEntity(LocationDto dto){
    if(dto == null) return null;

    return new Location(dto.getLatitude(), dto.getLongitude());
  }

  public LocationValidationResponse locationValidationSuccess(String message){
    return LocationValidationResponse.builder()
    .isValid(true)
    .message(message)
    .timestamp(LocalDateTime.now())
    .build();
  }

  public LocationValidationResponse locationValidationFaild(String message){
    return LocationValidationResponse.builder()
    .isValid(false)
    .message(message+" No Allow register attendance now.")
    .timestamp(LocalDateTime.now())
    .build();
  }
}
