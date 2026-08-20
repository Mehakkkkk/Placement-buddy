package com.placementtracker.backend.controller;

import com.placementtracker.backend.entity.Company;
import com.placementtracker.backend.service.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public ResponseEntity<?> addCompany(@AuthenticationPrincipal Integer userId, @RequestBody Company company) {
        Company saved = companyService.addCompany(userId, company);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Company>> getCompanies(@AuthenticationPrincipal Integer userId) {
        return ResponseEntity.ok(companyService.getCompanies(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCompanyById(@AuthenticationPrincipal Integer userId, @PathVariable Integer id) {
        try {
            return ResponseEntity.ok(companyService.getCompanyById(userId, id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompany(@AuthenticationPrincipal Integer userId, @PathVariable Integer id, @RequestBody Company company) {
        try {
            Company updated = companyService.updateCompany(userId, id, company);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompany(@AuthenticationPrincipal Integer userId, @PathVariable Integer id) {
        try {
            companyService.deleteCompany(userId, id);
            return ResponseEntity.ok(Map.of("message", "Company deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
