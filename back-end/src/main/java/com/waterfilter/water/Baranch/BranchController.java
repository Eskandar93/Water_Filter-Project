package com.waterfilter.water.Baranch;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.waterfilter.water.apiResponse.ApiResponse;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/branches/")
public class BranchController {

    private final BranchService branchService;

    @PostMapping("addBranch")
    public ResponseEntity<ApiResponse<BranchResponse>> addBranch(@RequestBody BranchRequest branchRequest){
        BranchResponse branchResponse = branchService.addBranch(branchRequest);
        ApiResponse<BranchResponse> response = ApiResponse.created(branchResponse, " Branch added successfully");
        return ResponseEntity.ok(response);
    }

    @PutMapping("updateBranch/{oldBranchId}")
    public ResponseEntity<ApiResponse<String>> updateBranch(@PathVariable Long oldBranchId, @RequestBody BranchRequest branchRequest){
        branchService.updateBranch(oldBranchId, branchRequest);
        ApiResponse<String> response = ApiResponse.success("Branch updated successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("getBranchById/{branchId}")
    public ResponseEntity<ApiResponse<BranchResponse>> getBranchById(@PathVariable Long branchId){
        BranchResponse branchResponse = branchService.getBranchById(branchId);
        ApiResponse<BranchResponse> response = ApiResponse.success(branchResponse);
        return ResponseEntity.ok(response);
    }

    @GetMapping("getAllBranches")
    public ResponseEntity<ApiResponse<List<BranchResponse>>> getAllBranches(){
        List<BranchResponse> branches = branchService.getAllBranches();
        ApiResponse<List<BranchResponse>> response = ApiResponse.success(branches);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("deleteBranchById/{branchId}")
    public ResponseEntity<ApiResponse<String>> deleteBranch(@PathVariable Long branchId){
        branchService.deleteBranch(branchId);
        ApiResponse<String> response = ApiResponse.success("Branch deleted successfully");
        return ResponseEntity.ok(response);
    }

}
