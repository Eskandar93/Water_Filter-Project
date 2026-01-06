package com.waterfilter.water.apiResponse;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {

  private LocalDateTime timestamp;
  private int status;
  private String message;
  private T data;
  private String path;

  public static <T> ApiResponse<T> success(T data){
    return ApiResponse.<T>builder()
          .timestamp(LocalDateTime.now())
          .status(HttpStatus.OK.value())
          .message("Success")
          .data(data)
          .build();
  }

    public static <T> ApiResponse<T> success(T data, String message){
    return ApiResponse.<T>builder()
          .timestamp(LocalDateTime.now())
          .status(HttpStatus.OK.value())
          .message(message)
          .data(data)
          .build();
  }
  
  public static <T> ApiResponse<T> created(T data,  String message){
    return ApiResponse.<T>builder()
          .timestamp(LocalDateTime.now())
          .status(HttpStatus.OK.value())
          .message(message)
          .data(data)
          .build();
  }

    public static ApiResponse<Void> error(HttpStatus status, String message){
    return ApiResponse.<Void>builder()
          .timestamp(LocalDateTime.now())
          .status(status.value())
          .message(message)
          .data(null)
          .build();
  }

}
