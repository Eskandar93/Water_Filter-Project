package com.waterfilter.water.location;

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

  // public LocationValidationResponse toLocationResponse(boolean isValid, String message, LocalDateTime timestamp){
  //   return LocationValidationResponse.builder()
  //   .isValid(isValid)
  //   .message(message)
  //   .timestamp(timestamp)
  //   .build();
  // }
}
