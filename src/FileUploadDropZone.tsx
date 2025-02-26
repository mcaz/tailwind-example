import React, { useState } from 'react';
import { Button } from 'react-aria-components';

export function FileUploadDropZone() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // ドラッグオーバー時の処理（デフォルト動作の防止と状態更新）
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  // ドラッグリーブ時に状態を戻す
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // ドロップ時の処理
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  };

  // ファイル選択（隠し input 経由）
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  // クリックで隠し input を起動する
  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div className="p-4">
      {/* ドラッグ＆ドロップエリア（Button コンポーネントを内包してアクセシブルに） */}
      <div
        className={`border-2 rounded p-4 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="ここにファイルをドラッグ＆ドロップ、またはクリックしてファイルを選択"
      >
        <p>ここにファイルをドラッグ＆ドロップ、またはクリックしてファイルを選択</p>
      </div>
      {/* 隠しのファイル入力 */}
      <input
        id="fileInput"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      {/* 選択されたファイルの一覧 */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold mb-2">選択されたファイル:</h4>
          <ul className="list-disc list-inside">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
