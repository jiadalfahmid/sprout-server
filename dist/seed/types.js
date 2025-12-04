"use strict";
// types.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalReportCategory = exports.BillCategory = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["INCOME"] = "income";
    TransactionType["EXPENSE"] = "expense";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var BillCategory;
(function (BillCategory) {
    BillCategory["UTILITIES"] = "Utilities";
    BillCategory["RENT"] = "Rent";
    BillCategory["SUBSCRIPTION"] = "Subscription";
    BillCategory["LOAN"] = "Loan";
    BillCategory["OTHER"] = "Other";
})(BillCategory || (exports.BillCategory = BillCategory = {}));
var MedicalReportCategory;
(function (MedicalReportCategory) {
    MedicalReportCategory["LAB_REPORT"] = "Lab Report";
    MedicalReportCategory["PRESCRIPTION"] = "Prescription";
    MedicalReportCategory["DOCTOR_NOTE"] = "Doctor Note";
    MedicalReportCategory["VACCINATION"] = "Vaccination Record";
})(MedicalReportCategory || (exports.MedicalReportCategory = MedicalReportCategory = {}));
