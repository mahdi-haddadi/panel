export const exportTableToExcel = (tableId: string, filename: string = "") => {
  let downloadLink;
  const dataType = "application/vnd.ms-excel";
  const tableSelect = document.getElementById(tableId);
  const tableHTML = tableSelect?.outerHTML.replace(/ /g, "%20");

  filename = filename ? filename + ".xls" : "excel_data.xls";

  downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  downloadLink.href = `data:${dataType}, ${tableHTML}`
  downloadLink.download = filename
  downloadLink.click()
};
