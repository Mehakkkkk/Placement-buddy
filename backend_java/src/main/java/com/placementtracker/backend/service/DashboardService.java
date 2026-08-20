package com.placementtracker.backend.service;

import com.placementtracker.backend.repository.CompanyRepository;
import com.placementtracker.backend.repository.DsaQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final CompanyRepository companyRepository;
    private final DsaQuestionRepository dsaQuestionRepository;

    public DashboardService(CompanyRepository companyRepository, DsaQuestionRepository dsaQuestionRepository) {
        this.companyRepository = companyRepository;
        this.dsaQuestionRepository = dsaQuestionRepository;
    }

    public Map<String, Object> getDashboardStats(Integer userId) {
        Integer totalApplications = companyRepository.countByUserId(userId);

        Map<String, Integer> statusBreakdown = new LinkedHashMap<>();
        statusBreakdown.put("Applied", companyRepository.countByUserIdAndStatus(userId, "Applied"));
        statusBreakdown.put("OA", companyRepository.countByUserIdAndStatus(userId, "OA"));
        statusBreakdown.put("Interview", companyRepository.countByUserIdAndStatus(userId, "Interview"));
        statusBreakdown.put("Selected", companyRepository.countByUserIdAndStatus(userId, "Selected"));
        statusBreakdown.put("Rejected", companyRepository.countByUserIdAndStatus(userId, "Rejected"));

        Integer totalDSA = dsaQuestionRepository.countByUserId(userId);
        Integer solvedDSA = dsaQuestionRepository.countByUserIdAndStatus(userId, "Solved");

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalApplications", totalApplications);
        stats.put("statusBreakdown", statusBreakdown);
        stats.put("totalDSA", totalDSA);
        stats.put("solvedDSA", solvedDSA);

        return stats;
    }
}
