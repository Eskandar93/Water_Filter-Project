package com.waterfilter.water.Baranch;

import com.waterfilter.water.address.Address;
import com.waterfilter.water.address.AddressMapper;
import com.waterfilter.water.exception.DublicateResourceException;
import com.waterfilter.water.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BranchService {

    private final BranchRepository branchRepository;
    private final BranchMapper branchMapper;
    private final AddressMapper addressMapper;

    public void addBranch(BranchRequest branchRequest) {

        if(branchRepository.findByName(branchRequest.getName()).isPresent()){
            throw new DublicateResourceException("This Branch has name: " +
            branchRequest.getName() +"  already exists");
        }

        if(branchRepository.findByPhoneNumber(branchRequest.getPhoneNumber()).isPresent()){
            throw new DublicateResourceException("This Branch has phoneNumber: " +
            branchRequest.getPhoneNumber() +"  already exists");
        }


        // create branch
        Branch branch = new Branch();
        branch.setName(branchRequest.getName());
        branch.setPhoneNumber(branchRequest.getPhoneNumber());
        branch.setManagerName(branchRequest.getManagerName());
        branch.setCoverageRadiusKm(branchRequest.getCoverageRediusKm());

        if(branchRequest.getBranchAddress() != null) {
              Address address = addressMapper.toEntity(branchRequest.getBranchAddress());
              branch.setAddress(address);
        }

        branchRepository.save(branch);
    }
    public void updateBranch(Long oldBranchId, BranchRequest branchRequest) {

        Branch branch = branchRepository.findById(oldBranchId)
        .orElseThrow(()-> new ResourceNotFoundException("Branch not found with id: " + oldBranchId));

        branch.setName(branchRequest.getName());
        branch.setPhoneNumber(branchRequest.getPhoneNumber());
        branch.setManagerName(branchRequest.getManagerName());
        branch.setCoverageRadiusKm(branchRequest.getCoverageRediusKm());


        //branch.setAddress(addressMapper.toEntity(branchRequest.getBranchAddress()));

        if(branchRequest.getBranchAddress() != null){
            if(branch.getAddress() == null){
                // Create new address
                Address newAddress = addressMapper.toEntity(branchRequest.getBranchAddress());
                branch.setAddress(newAddress);
                // newAddress.setBranch(branch);
            }
            else{
                // Update existing address
                addressMapper.updateAddress(branch.getAddress(), branchRequest.getBranchAddress());
                // branch.getAddress().setBranch(branch);
                // Relationship maintained by @PreUpdate
            }
        }

        branchRepository.save(branch);
    }

    public BranchResponse getBranchById(Long branchId) {

        Branch branch = branchRepository.findById(branchId)
        .orElseThrow(()-> new ResourceNotFoundException("Branch not found with id: " + branchId));

        return branchMapper.toBranchResponse(branch);
    }

    public List<BranchResponse> getAllBranches() {
        List<Branch> branches = branchRepository.findAll();

        return branches.stream()
                .map(branchMapper::toBranchResponse)
                .collect(Collectors.toList());
    }

    public void deleteBranch(Long branchId) {

        Branch branch = branchRepository.findById(branchId)
            .orElseThrow(()-> new ResourceNotFoundException("Branch not found with id: " + branchId));

        if(branch.getAddress() != null){
            branch.getAddress().setBranch(null);
        }

        branchRepository.deleteById(branchId);
    }
}
