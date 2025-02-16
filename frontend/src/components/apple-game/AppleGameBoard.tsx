import React from "react";

type Cell = {
  row: number;
  col: number;
  value: number;
};

type Props = {
  cells: Cell[][];
  selectedCells: Set<string>;
};

const AppleGameBoard: React.FC<Props> = ({ cells, selectedCells }) => {
  return (
    <div className="flex flex-col border-4 border-black w-fit select-none gap-1 p-1 bg-gray-200 rounded-lg">
      {cells.map((rowCells, row) => (
        <div key={row} className="flex gap-1">
          {rowCells.map((cell) => {
            const isSelected = selectedCells.has(`${cell.row},${cell.col}`);
            return cell.value !== 0 ? (
              <div
                key={`${cell.row}-${cell.col}`}
                data-row={cell.row} // ✅ 올바른 데이터 추가
                data-col={cell.col}
                className={`cell w-10 h-10 flex items-center justify-center text-white font-bold border rounded-md ${
                  isSelected
                    ? "border-yellow-400 border-4 bg-red-700"
                    : "border-gray-300 bg-red-500"
                }`}
              >
                {cell.value}
              </div>
            ) : (
              <div key={`${cell.row}-${cell.col}`} className="w-10 h-10"></div> // 빈 셀
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default AppleGameBoard;
