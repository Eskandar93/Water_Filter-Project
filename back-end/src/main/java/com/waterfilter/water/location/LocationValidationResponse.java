package com.waterfilter.water.location;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocationValidationResponse {

    private boolean isValid;
    private String message;
    private Double distance;
    private Double allowedDistance;
    private LocalDateTime timestamp;

    public static LocationValidationResponse success (String message, double distance, double allowedDistance){
        return LocationValidationResponse.builder()
        .isValid(true)
        .message(message)
        .distance(distance)
        .allowedDistance(allowedDistance)
        .timestamp(LocalDateTime.now())
        .build();
    }

}
