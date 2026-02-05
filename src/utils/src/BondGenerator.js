import { jsPDF } from "jspdf";

export const generateBondPDF = (userData) => {
  const doc = new jsPDF("p", "mm", "a4");
  const width = doc.internal.pageSize.getWidth();
  
  // 1. Background Parchment
  doc.setFillColor(255, 254, 240);
  doc.rect(0, 0, width, 297, "F");

  // 2. Header Box (Purple/Red Stamp Area)
  doc.setDrawColor(120, 0, 0);
  doc.setLineWidth(1);
  doc.rect(10, 10, width - 20, 45);

  // 3. Indian Gov Text
  doc.setTextColor(120, 0, 0);
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text("भारत (INDIA)", width / 2, 22, { align: "center" });
  doc.setFontSize(16);
  doc.text("NON JUDICIAL STAMP DUTY", width / 2, 32, { align: "center" });
  
  doc.setFontSize(28);
  doc.text("Rs. 100", width / 2, 48, { align: "center" });

  // 4. Bond Content
  doc.setTextColor(0, 0, 0);
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  
  let y = 70;
  doc.text(`CERTIFICATE NO: INFRA-TOKEN-${Math.floor(Math.random() * 999999)}`, 20, y);
  y += 10;
  doc.text(`DATE OF ISSUANCE: ${new Date().toLocaleDateString()}`, 20, y);
  
  y += 20;
  doc.setFontSize(14);
  doc.setFont("times", "bold");
  doc.text("MEMORANDUM OF TOKENIZED INVESTMENT", width / 2, y, { align: "center" });
  
  y += 15;
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  const text = `This digital bond certificate confirms that ${userData.name.toUpperCase()}, holding PAN: ${userData.pan}, has successfully invested a sum of INR ${userData.amount} into the project: ${userData.projectName}. This investment has been tokenized on the blockchain with Transaction Hash: ${userData.txHash}. The holder is entitled to quarterly yields as per the Smart City Infrastructure Act.`;
  
  const splitText = doc.splitTextToSize(text, width - 40);
  doc.text(splitText, 20, y);

  // 5. Watermark
  doc.setTextColor(230, 230, 230);
  doc.setFontSize(60);
  doc.text("GOVT OF INDIA", 30, 200, { angle: 45 });

  doc.save(`Bond_${userData.name.replace(/\s+/g, '_')}.pdf`);
};