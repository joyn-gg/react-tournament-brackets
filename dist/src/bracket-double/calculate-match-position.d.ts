export declare const calculateVerticalStartingPoint: (columnIndex: any, height: any) => number;
export declare const columnIncrement: (columnIndex: any, height: any) => number;
export declare const calculateHeightIncrease: (columnIndex: any, rowIndex: any, height: any) => number;
export declare const calculateVerticalPositioning: ({ rowIndex, columnIndex, rowHeight: height, }: {
    rowIndex: any;
    columnIndex: any;
    rowHeight: any;
}) => number;
export declare const calculatePositionOfFinalGame: (rowIndex: any, columnIndex: any, { canvasPadding, columnWidth, upperBracketHeight, roundHeader, offsetX, offsetY, }: {
    canvasPadding: any;
    columnWidth: any;
    upperBracketHeight: any;
    roundHeader?: number;
    offsetX?: number;
    offsetY?: number;
}) => {
    x: any;
    y: number;
};
export declare const calculatePositionOfMatchUpperBracket: (rowIndex: any, columnIndex: any, { canvasPadding, rowHeight, columnWidth, offsetX, offsetY }: {
    canvasPadding: any;
    rowHeight: any;
    columnWidth: any;
    offsetX?: number;
    offsetY?: number;
}) => {
    x: any;
    y: any;
};
export declare const returnLowerBracketColumnIndex: (columnIndex: any) => number;
export declare const calculatePositionOfMatchLowerBracket: (rowIndex: any, columnIndex: any, { canvasPadding, rowHeight, columnWidth, offsetX, offsetY }: {
    canvasPadding: any;
    rowHeight: any;
    columnWidth: any;
    offsetX?: number;
    offsetY?: number;
}) => {
    x: any;
    y: any;
};
