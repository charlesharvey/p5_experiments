class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bigX = this.x * gridSize;
        this.bigY = this.y * gridSize;

        this.player = null;
    }



    show() {
        noFill();
        stroke(255);
        strokeWeight(1);
        rect(this.bigX, this.bigY, gridSize, gridSize);


        if (this.player != null) {
            if (this.player == 1) {
                fill(255, 255, 0);
            } else {
                fill(255, 0, 255);
            }
            noStroke();
            ellipseMode();
            ellipse(this.bigX + gridSize * 0.5, this.bigY + gridSize * 0.5, gridSize * 0.5, gridSize * 0.5);
        }
    }


    clicked(x, y) {

        const isClickedX = (x < this.bigX + gridSize && x > this.bigX);
        const isClickedY = (y < this.bigY + gridSize && y > this.bigY);
        if (isClickedX && isClickedY) {
            if (this.player == null) {
                this.player = currentPlayer;
                this.reverseTiles();
            }
        }
    }

    cellAt(x, y) {
        const ii = x * cols + y;
        return cells[ii];
    }

    reverseTiles() {
        this.reverseTilesHorizontallyLeft();  //working ok
        this.reverseTilesHorizontallyRight();
        this.reverseTilesVerticallyTop();
        this.reverseTilesVerticallyBottom();
    }

    reverseTilesHorizontallyLeft() {


        // horizontally left cells
        let toChange = [];
        let canAdd = true;
        let lastAddedIndex;
        for (let i = this.x + 1; i < cols; i++) {
            if (canAdd) {
                const other = this.cellAt(i, this.y);
                if (other.player == null) {
                    canAdd = false;
                } else {
                    if (other.player == this.player) {
                        canAdd = false;
                    } else {
                        toChange.push(other);
                        lastAddedIndex = other.x;
                    }
                }
            }
        }
        // if the nextTile in the sequence is also you, you can switch the ones in the middle;
        const nextTileIndex = lastAddedIndex + 1
        if (nextTileIndex < cols) {
            if (this.cellAt(nextTileIndex, this.y).player == this.player) {
                toChange.forEach(tile => {
                    tile.player = (tile.player + 1) % 2;
                })
            }
        }
    }



    reverseTilesVerticallyBottom() {


        // vertically bottom cells
        let toChange = [];
        let canAdd = true;
        let lastAddedIndex;
        for (let i = this.y + 1; i < cols; i++) {
            if (canAdd) {
                const other = this.cellAt(this.x, i);
                if (other.player == null) {
                    canAdd = false;
                } else {
                    if (other.player == this.player) {
                        canAdd = false;
                    } else {
                        toChange.push(other);
                        lastAddedIndex = other.x;
                    }
                }
            }
        }
        // if the nextTile in the sequence is also you, you can switch the ones in the middle;
        const nextTileIndex = lastAddedIndex + 1;
        if (nextTileIndex < cols) {
            if (this.cellAt(this.x, nextTileIndex).player == this.player) {
                toChange.forEach(tile => {
                    tile.player = (tile.player + 1) % 2;
                })
            }
        }
    }



    reverseTilesHorizontallyRight() {

        // horizontally right cells
        let toChange = [];
        let canAdd = true;
        let lastAddedIndex;
        for (let i = this.x - 1; i > 0; i--) {
            if (canAdd) {
                const other = this.cellAt(i, this.y);
                if (other.player == null) {
                    canAdd = false;
                } else {
                    if (other.player == this.player) {
                        canAdd = false;
                    } else {
                        toChange.push(other);
                        lastAddedIndex = other.x;
                    }
                }
            }
        }
        // if the nextTile in the sequence is also you, you can switch the ones in the middle;
        const nextTileIndex = lastAddedIndex - 1
        if (nextTileIndex >= 0) {
            if (this.cellAt(nextTileIndex, this.y).player == this.player) {
                toChange.forEach(tile => {
                    tile.player = (tile.player + 1) % 2;
                })
            }
        }
    }




    reverseTilesVerticallyTop() {

        // vertically top cells
        let toChange = [];
        let canAdd = true;
        let lastAddedIndex;
        for (let i = this.y - 1; i > 0; i--) {
            if (canAdd) {
                const other = this.cellAt(this.x, i);
                if (other.player == null) {
                    canAdd = false;
                } else {
                    if (other.player == this.player) {
                        canAdd = false;
                    } else {
                        toChange.push(other);
                        lastAddedIndex = other.x;
                    }
                }
            }
        }
        // if the nextTile in the sequence is also you, you can switch the ones in the middle;
        const nextTileIndex = lastAddedIndex - 1;
        if (nextTileIndex >= 0) {
            if (this.cellAt(this.x, nextTileIndex).player == this.player) {
                toChange.forEach(tile => {
                    tile.player = (tile.player + 1) % 2;
                })
            }
        }
    }


}