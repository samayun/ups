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
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF();
      const imgWidth = 190;
      const pageHeight = doc.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save("eStatement.pdf");
    }
  };

  return (
    <>
      <div className="container">
        <div className="tabs">
          <button
            onClick={() => setActiveTab("Branch")}
            className={`tab ${activeTab === "Branch" ? "active" : ""}`}
          >
            Branch
          </button>
          <button
            onClick={() => setActiveTab("Account")}
            className={`tab ${activeTab === "Account" ? "active" : ""}`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab("Bank")}
            className={`tab ${activeTab === "Bank" ? "active" : ""}`}
          >
            Bank
          </button>
          <button
            onClick={() => setActiveTab("Statement")}
            className={`tab ${activeTab === "Statement" ? "active" : ""}`}
          >
            Statement
          </button>
        </div>
        {activeTab === "Bank" && <BankComponent />}
        {activeTab === "Branch" && <BranchComponent />}
        {activeTab === "Statement" && (
          <>
            <div ref={pdfRef} className="statement">
              <EStatement />
            </div>
            <button onClick={downloadPDF} className="download-btn">
              Download eStatement as PDF
            </button>
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
        }
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .tab {
          padding: 10px 20px;
          border: none;
          background-color: #f0f0f0;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .tab.active {
          background-color: blue;
          color: white;
        }
        .statement {
          margin-right: auto;
          text-align: right;
        }
        .download-btn {
          margin-top: 20px;
          background-color: green;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        @media (max-width: 600px) {
          .container {
            padding: 10px;
          }
          .tabs {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
