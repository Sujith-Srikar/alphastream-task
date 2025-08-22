const defaultEntitlement = {
  clientDefault: {
    LoanDocuments: {
      columns: [
        "DocumentId",
        "LoanId",
        "FileName",
        "DocumentType",
        "Amount",
        "Status",
        "Issuer",
        "UploadDate"
      ],
      filters: {
        Status: ["Active", "Pending", "Verified", "Rejected"],
        DocumentType: ["Agreement", "ID Proof", "Income Proof", "Application"],
        UploadDateRange: { From: "date", To: "date" },
        Issuer: []
      }
    },
    SideLetters: {
      columns: [
        "Id",
        "Party",
        "FundName",
        "EffectiveDate",
        "Status",
        "ExpiryDate",
        "Jurisdiction",
        "DocumentType"
      ],
      filters: {
        Status: ["Active", "Expired", "Draft"],
        FundName: [],
        Jurisdiction: [],
        EffectiveDateRange: { From: "date", To: "date" },
        ExpiryDateRange: { From: "date", To: "date" }
      }
    },
    LPA: {
      columns: [
        "Id",
        "FundName",
        "EffectiveDate",
        "Version",
        "CommitmentPeriod",
        "Jurisdiction",
        "DocumentType"
      ],
      filters: {
        EffectiveDateRange: { From: "date", To: "date" },
        FundName: [],
        Version: []
      }
    },
    ValuationMemo: {
      columns: [
        "Id",
        "FundName",
        "ValuationDate",
        "NAV",
        "ValuationMethodology",
        "PreparedBy",
        "ApprovedBy",
        "Status",
        "LastModified",
        "Currency"
      ],
      filters: {
        FundName: [],
        ValuationDateRange: { From: "date", To: "date" },
        Status: ["Draft", "Reviewed", "Final"],
        ValuationMethodology: ["DCF", "Comparable Companies", "Market Multiple", "NAV"],
        Currency: []
      }
    }
  },

  userDefault: {
    LoanDocuments: {
      columns: ["DocumentId", "FileName", "Amount", "Status"],
      filters: {
        Status: ["Active", "Pending"],
        UploadDateRange: { From: "date", To: "date" }
      }
    },
    SideLetters: {
      columns: ["Id", "Party", "EffectiveDate", "Status"],
      filters: {
        Status: ["Active", "Expired"]
      }
    },
    LPA: {
      columns: ["Id", "FundName", "Version"],
      filters: {
        FundName: []
      }
    },
    ValuationMemo: {
      columns: ["Id", "FundName", "ValuationDate", "NAV", "Status"],
      filters: {
        Status: ["Reviewed", "Final"],
        ValuationDateRange: { From: "date", To: "date" }
      }
    }
  }
};

export default defaultEntitlement;
