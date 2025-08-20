let defaultEntitlement = {
  "clientDefault": {
    "LoanDocuments": {
      "columns": ["id", "documentName", "amount", "status"],
      "filters": { "status": "active" }
    },
    "SideLetters": {
      "columns": ["id", "party", "date"],
      "filters": {}
    },
    "LPA": {
      "columns": ["id", "fundName", "effectiveDate"],
      "filters": {}
    },
    "ValuationMemo": {
      "columns": ["id", "valuationDate", "value"],
      "filters": {}
    }
  },
  "userDefault": {
    "LoanDocuments": {
      "columns": ["id", "documentName", "amount"],
      "filters": {}
    },
    "SideLetters": {
      "columns": ["id", "party"],
      "filters": {}
    },
    "LPA": {
      "columns": ["id", "fundName"],
      "filters": {}
    },
    "ValuationMemo": {
      "columns": ["id", "valuationDate"],
      "filters": {}
    }
  }
}

export default defaultEntitlement;