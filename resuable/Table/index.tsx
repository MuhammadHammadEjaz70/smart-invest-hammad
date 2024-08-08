import React from 'react';

interface TableProps {
  columns: Array<{
    header: string;
    accessor: string;
    Cell?: (props: { value: any, row: any }) => JSX.Element;
  }>;
  data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const getColorForIndex = (index: number) => {
    const colors = [
      "#9969FF",
      "#007AFF",
      "#FF008A",
      "#FFA800",
      "#0DC46E",
      "#007AFF",
    ];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };
  return (
    <div className={`table`} style={{ overflowX: "auto" }}>
      <table>
        <thead>
          <tr
            style={{
              whiteSpace: "nowrap",
              background: "#151515",
              color: "white",
              borderTopLeftRadius: "10px", // Add border-radius to first th
              borderTopRightRadius: "10px", // Add border-radius to last th
            }}>
            {columns.map((col, colIndex) => (
              <th style={{ paddingLeft:
                colIndex === 0
                  ? `20px`
                  : `0px`,}} key={col.header}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", background: '#151515' }}
              >
                No Data Available
              </td>
            </tr>
          ) :
            (data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  background: "#252525",
                }}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex}
                    style={{
                      borderLeft:
                        colIndex === 0
                          ? `2px solid ${getColorForIndex(rowIndex)}`
                          : undefined,
                          paddingLeft:
                          colIndex === 0
                            ? `20px`
                            : `0px`,
                    }}>
                    {col.Cell ? col.Cell({ value: row[col.accessor], row }) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            )))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
