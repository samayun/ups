"use client";

import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import EStatement from "./components/EStatement";
import BankComponent from "./components/BankComponent";
import BranchComponent from "./components/BranchComponent";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Branch");
  const pdfRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, {
        useCORS: true, // Enable CORS to load images from external sources
      });
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF();
      const imgWidth = 190; // Adjust width as needed
      const pageHeight = doc.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to the PDF
      doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Handle page breaks if the content exceeds one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      doc.save("eStatement.pdf");
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("Branch")}
            className={`px-4 py-2 rounded ${
              activeTab === "Branch" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Branch
          </button>
          <button
            onClick={() => setActiveTab("Account")}
            className={`px-4 py-2 rounded ${
              activeTab === "Account" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab("Bank")}
            className={`px-4 py-2 rounded ${
              activeTab === "Bank" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Bank
          </button>

          <button
            onClick={() => setActiveTab("Statement")}
            className={`px-4 py-2 rounded ${
              activeTab === "Bank" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Statement
          </button>
        </div>
        {activeTab === "Bank" && <BankComponent />}
        {activeTab === "Branch" && <BranchComponent />}
        {activeTab === "Statement" && (
          <>
            <div ref={pdfRef} className="mr-auto text-right">
              <EStatement />
            </div>
            <button
              onClick={downloadPDF}
              className="mt-4 bg-blue-500 text-white p-2 rounded text-right mr-auto"
            >
              Download eStatement as PDF
            </button>
          </>
        )}
      </div>
    </>
  );
}
