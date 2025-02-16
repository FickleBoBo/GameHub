import React, { useState, useRef } from "react";
import AppleGameBoard from "../../../components/apple-game/AppleGameBoard";

const ROWS = 10;
const COLS = 17;

type Cell = {
  row: number;
  col: number;
  value: number;
};

const AppleGamePage: React.FC = () => {
  // 모든 셀들의 초기 랜덤 값 설정
  const [cells, setCells] = useState<Cell[][]>(
    Array.from({ length: ROWS }, (_, row) =>
      Array.from({ length: COLS }, (_, col) => ({
        row,
        col,
        value: Math.floor(Math.random() * 9) + 1, // 1~9 랜덤 숫자
      }))
    )
  );

  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [sum, setSum] = useState(0); // 선택된 셀들의 합을 저장
  const [removedCount, setRemovedCount] = useState(0); // 제거된 블록 개수
  const isDragging = useRef(false);
  const selectionBox = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const boardRef = useRef<HTMLDivElement | null>(null);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 🛑 마우스를 클릭하면 드래그 박스 시작
  const handleMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    startPos.current = { x: event.clientX, y: event.clientY };
    selectionBox.current = {
      x: event.clientX,
      y: event.clientY,
      width: 0,
      height: 0,
    };
    setSelectedCells(new Set());
    setSum(0);
  };

  // 🛑 마우스를 드래그하면 박스 크기 조절 & 숫자 합 계산
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging.current) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    selectionBox.current = {
      x: Math.min(startPos.current.x, currentX),
      y: Math.min(startPos.current.y, currentY),
      width: Math.abs(currentX - startPos.current.x),
      height: Math.abs(currentY - startPos.current.y),
    };

    if (boardRef.current) {
      const newSelectedCells = new Set<string>();
      let newSum = 0;

      // 🛑 정확한 셀 좌표 가져오기
      const cellElements = boardRef.current.querySelectorAll(".cell");
      cellElements.forEach((cellElement) => {
        const rect = cellElement.getBoundingClientRect();
        const cellRow = Number(cellElement.getAttribute("data-row"));
        const cellCol = Number(cellElement.getAttribute("data-col"));

        const boxLeft = selectionBox.current.x;
        const boxRight = selectionBox.current.x + selectionBox.current.width;
        const boxTop = selectionBox.current.y;
        const boxBottom = selectionBox.current.y + selectionBox.current.height;

        if (
          rect.right > boxLeft &&
          rect.left < boxRight &&
          rect.bottom > boxTop &&
          rect.top < boxBottom
        ) {
          newSelectedCells.add(`${cellRow},${cellCol}`);
          newSum += cells[cellRow][cellCol].value;
        }
      });

      setSelectedCells(newSelectedCells);
      setSum(newSum);
    }
  };

  // 🛑 마우스를 놓으면 드래그 박스 삭제 및 숫자 합 연산
  const handleMouseUp = () => {
    isDragging.current = false;
    selectionBox.current = { x: 0, y: 0, width: 0, height: 0 };

    if (sum === 10) {
      let removed = selectedCells.size; // ✅ 정확한 제거된 블록 개수
      setCells((prevCells) =>
        prevCells.map((rowCells) =>
          rowCells.map((cell) =>
            selectedCells.has(`${cell.row},${cell.col}`)
              ? { ...cell, value: 0 } // 0으로 설정하여 비활성화 (삭제)
              : cell
          )
        )
      );
      setRemovedCount((prev) => prev + removed); // ✅ 제거된 블록 개수 정확히 업데이트
    }

    setSelectedCells(new Set());
    setSum(0);
  };

  return (
    <div
      className="flex flex-col items-center w-full h-screen relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h1 className="text-xl font-bold mb-4">애플 게임 보드</h1>

      <div ref={boardRef}>
        <AppleGameBoard cells={cells} selectedCells={selectedCells} />
      </div>

      {isDragging.current && (
        <div
          className={`absolute border ${
            sum === 10
              ? "bg-red-400 border-red-500"
              : "bg-blue-400 border-blue-500"
          } bg-opacity-30`}
          style={{
            left: selectionBox.current.x,
            top: selectionBox.current.y,
            width: selectionBox.current.width,
            height: selectionBox.current.height,
          }}
        />
      )}

      {/* 제거된 블록 개수 표시 */}
      <div className="absolute bottom-4 text-xl font-bold bg-gray-800 text-white px-4 py-2 rounded-lg">
        제거된 블록 수: {removedCount}
      </div>
    </div>
  );
};

export default AppleGamePage;
