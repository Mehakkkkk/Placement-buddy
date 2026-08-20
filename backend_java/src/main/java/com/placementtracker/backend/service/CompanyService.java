package com.placementtracker.backend.service;

import com.placementtracker.backend.entity.Company;
import com.placementtracker.backend.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Company addCompany(Integer userId, Company company) {
        company.setUserId(userId);
        if (company.getStatus() == null) {
            company.setStatus("Applied");
        }
        return companyRepository.save(company);
    }

    public List<Company> getCompanies(Integer userId) {
        return companyRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Company getCompanyById(Integer userId, Integer id) {
        return companyRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));
    }

    public Company updateCompany(Integer userId, Integer id, Company updatedData) {
        Company existing = companyRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));

        existing.setCompanyName(updatedData.getCompanyName());
        existing.setRole(updatedData.getRole());
        existing.setPackageAmount(updatedData.getPackageAmount());
        existing.setStatus(updatedData.getStatus());
        existing.setApplicationDate(updatedData.getApplicationDate());
        existing.setDeadline(updatedData.getDeadline());
        existing.setNotes(updatedData.getNotes());

        return companyRepository.save(existing);
    }

    public void deleteCompany(Integer userId, Integer id) {
        Company existing = companyRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));
        companyRepository.delete(existing);
    }
}
