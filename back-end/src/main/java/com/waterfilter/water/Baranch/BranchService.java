package com.waterfilter.water.Baranch;

import com.waterfilter.water.address.Address;
import com.waterfilter.water.address.AddressMapper;
import com.waterfilter.water.exception.DublicateResourceException;
import com.waterfilter.water.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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



        Branch branch = new Branch();
        branch.setName(branchRequest.getName());
        branch.setPhoneNumber(branchRequest.getPhoneNumber());
        branch.setManagerName(branchRequest.getManagerName());

        if(branchRequest.getBranchAddress() != null) {
            //  Address address = addressMapper.toEntity(branchRequest.getBranchAddress());
            //  branch.setAddress(address);
            branch.setAddress(addressMapper.toEntity(branchRequest.getBranchAddress()));
        }

        branchRepository.save(branch);
    }
    public void updateBranch(BranchRequest branchRequest) {

        Optional<Branch> existingBranch = branchRepository.findById(branchRequest.getBranchId());
        if (!existingBranch.isPresent()) {
            throw new ResourceNotFoundException("Branch not found with id: " + branchRequest.getBranchId());
        }

        Branch branch = existingBranch.get();
        branch.setName(branchRequest.getName());
        branch.setPhoneNumber(branchRequest.getPhoneNumber());
        branch.setManagerName(branchRequest.getManagerName());

        //branch.setAddress(addressMapper.toEntity(branchRequest.getBranchAddress()));

        if(branchRequest.getBranchAddress() != null){
            if(branch.getAddress() == null){
                Address newAddress = addressMapper.toEntity(branchRequest.getBranchAddress());
                branch.setAddress(newAddress);
                // newAddress.setBranch(branch);
            }
            else{
                addressMapper.updateAddress(branch.getAddress(), branchRequest.getBranchAddress());
                branch.getAddress().setBranch(branch);
                // Relationship maintained by @PreUpdate
            }
        }

        branchRepository.save(branch);
    }

    public BranchResponse getBranchById(Long branchId) {

        Optional<Branch> existingBranch = branchRepository.findById(branchId);
        if (!existingBranch.isPresent()) {
            throw new ResourceNotFoundException("Branch not found with id: " + branchId);
        }

        return branchMapper.toBranchResponse(existingBranch.get());
    }

    public List<BranchResponse> getAllBranches() {
        List<Branch> branches = branchRepository.findAll();

        return branches.stream()
                .map(branchMapper::toBranchResponse)
                .collect(Collectors.toList());
    }

    public void deleteBranch(Long branchId) {
        Optional<Branch> existingBranch = branchRepository.findById(branchId);
        if (!existingBranch.isPresent()) {
            throw new ResourceNotFoundException("Branch not found with id: " + branchId);

        }

        if(existingBranch.get().getAddress() != null){
            existingBranch.get().getAddress().setBranch(null);
        }

        branchRepository.deleteById(branchId);
    }
}
