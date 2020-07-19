import React from 'react';
import { CSS_COLOR_NAMES, ROW_NEIGHBORS, COL_NEIGHBORS, ISLAND_COLOR, FREE_BIT_COLOR } from '../../consts';

const bitmapSolver = (WrappedComponent) => {
    class HOC extends React.Component {

        initBitMap = (rows, cols, isRandom) => {
            let bitmap = new Array(rows);
            for (let row = 0; row < rows; row++) {
                bitmap[row] = new Array(cols);
                for (let col = 0; col < cols; col++) {
                    bitmap[row][col] = {
                        visited: false,
                        color: isRandom ? (Math.floor(Math.random() * 2) ? ISLAND_COLOR : FREE_BIT_COLOR) : FREE_BIT_COLOR
                    }
                }
            };

            return bitmap;
        }

        isSafe(bitMap, row, col) {
            return ((row >= 0) && (row < bitMap.length) && (col >= 0) && (col < bitMap[0].length) && 
                    (bitMap[row][col].color === ISLAND_COLOR && !bitMap[row][col].visited));
        }


        async findIsland(bitmap,row,col,color) {
            bitmap[row][col].color = CSS_COLOR_NAMES[color % CSS_COLOR_NAMES.length];
    
            return new Promise(async (resolve) => {
                for (let index = 0; index <  8; index++) {
                    const nRow = row + ROW_NEIGHBORS[index];
                    const nCol = col + COL_NEIGHBORS[index];
    
                    if (this.isSafe(bitmap, nRow,nCol)) 
                    {
                        await this.findIsland(bitmap, nRow, nCol, color)
                    }
                }
    
                resolve();
            });
        }

        solve = (bitmap) => {
            return new Promise(async (resolve, reject) => {
            let counter = 0;
            for (let row = 0; row < bitmap.length; row++) {
                for (let col = 0; col < bitmap[row].length; col++) {
                    if (!bitmap[row][col].visited && bitmap[row][col].color === ISLAND_COLOR) {
                        await this.findIsland(bitmap, row, col, counter)
                        counter++;
                    }
                }
            }
            return resolve({ bitmap, counter });
        })
        }

        render() {
            return <WrappedComponent {...this.props} solve={this.solve} initBitMap={this.initBitMap} />;
        }
    }

    return HOC;
};

export default bitmapSolver;