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
    private LocalDateTime timestamp;
}
