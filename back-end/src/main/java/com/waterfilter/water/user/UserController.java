package com.waterfilter.water.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waterfilter.water.apiResponse.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/")
public class UserController {

  private final UserService userService;

  @PostMapping("register")
  public ResponseEntity<ApiResponse<UserResponse>> register(@RequestBody UserRequest request){
      UserResponse userResponse = userService.register(request);
      ApiResponse<UserResponse> response = ApiResponse.created(userResponse, " User registered successfully");
      return ResponseEntity.ok(response);
  }

  @PostMapping("login")
  public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody UserLoginRequest request){
    LoginResponse response = userService.login(request);
    ApiResponse<LoginResponse> apiResponse = ApiResponse.success(response, "Login successfully");
    return ResponseEntity.ok(apiResponse);
  }

}
