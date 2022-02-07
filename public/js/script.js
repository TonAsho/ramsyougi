console.log("Hello, World!");
window.onload = function() {
    drawBoard();
    drawPieces();
    goPieces();
}// carifies here
let getedKomaMe = [];
let getedKomaYou = [];
let komaCount = 0;
let onClicked = false;
let onClickedNumber = 0;
let onClickedNumberGeted = 0;

let nowGoing = [];
function goPieces() {
    for (let n = 1; n <= 81; n++) {
        let clickCount = 0;
        document.getElementById(`${n}`).addEventListener("click" ,()=> {
            if(nowGoing.length>0 && onClickedNumber !== n) {
                for(let fx=0;fx<nowGoing.length;fx++) {
                    if(nowGoing[fx] === n) { 
                        if (onClicked === true && onClickedNumberGeted !== 0) {
                            let nedInArrayFGeted;
                            let nedInArrayLGeted;
                            if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
                                nedInArrayFGeted = n/9-1;
                                nedInArrayLGeted = 8;
                            } else {
                                nedInArrayFGeted = Math.floor(n/9);
                                nedInArrayLGeted = Math.floor(n%9-1);
                            }
                            komaDeleter(nedInArrayFGeted, nedInArrayLGeted);
                            document.getElementById(`${onClickedNumberGeted*100}`).remove();
                            onClickedNumberGeted = 0;
                            onClicked = false;
                            nowGoing.length = 0;
                            drawPiecesBack();
                            drawBoard();
                            drawPieces();
                            goPieces();
                            return;
                        } else if (onClicked === true && onClickedNumber !== n) {
                            // 駒移動
                            // onClickedNumberからnのますへ移動
                            let clickedKomaInArrayF;
                            let clickedKomaInArrayL;
                            if(onClickedNumber===9||onClickedNumber===18||onClickedNumber===27||onClickedNumber===36||onClickedNumber===45||onClickedNumber===54||onClickedNumber===63||onClickedNumber===72||onClickedNumber===81) {
                                clickedKomaInArrayF = onClickedNumber/9-1;
                                clickedKomaInArrayL = 8;
                            } else {
                                clickedKomaInArrayF = Math.floor(onClickedNumber/9);
                                clickedKomaInArrayL = Math.floor(onClickedNumber%9-1);
                            }
                            let nedInArrayF;
                            let nedInArrayL
                            if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
                                nedInArrayF = n/9-1;
                                nedInArrayL = 8;
                            } else {
                                nedInArrayF = Math.floor(n/9);
                                nedInArrayL = Math.floor(n%9-1);
                            }
                            ///let clickedKomaImage = choseKoma(pieces[clickedKomaInArrayF][clickedKomaInArrayL]);
                            ///let first = document.getElementById(`${n}`);
                            ///let last = document.getElementById(`${onClickedNumber}`);
                            changeStyleBoardBack(onClickedNumber);
                            ///first.childNodes[0].src = `/images/${clickedKomaImage}`;
                            ///first.childNodes[0].style.display = "block";
                            ///last.childNodes[0].src = "";
                            ///last.childNodes[0].style.display = "none";
                            getedKomaAdder(pieces[nedInArrayF][nedInArrayL]);  
                            pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL];
                            pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0;                 
                            onClicked = false;
                            onClickedNumber = 0;
                            komaCount+=1;
                            nowGoing.length=0;
                            drawPiecesBack();
                            drawBoard();
                            drawPieces();
                            goPieces();
                            return;
                        } 

                    }
                }
                onClickedNumberGeted = 0;
                onClicked = false;
                nowGoing.length = 0;
                drawPiecesBack();
                drawBoard();
                drawPieces();
                goPieces();
            } else {
                if(getNumber(n) != 0) {
                    if (clickCount === 0) {
                        let nedInArrayFGeted;
                        let nedInArrayLGeted;
                        if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
                            nedInArrayFGeted = n/9-1;
                            nedInArrayLGeted = 8;
                        } else {
                            nedInArrayFGeted = Math.floor(n/9);
                            nedInArrayLGeted = Math.floor(n%9-1);
                        }
                        nowGoing = restrictPieces(n, pieces[nedInArrayFGeted][nedInArrayLGeted]);
                        for(let nstyle=0;nstyle<nowGoing.length;nstyle++) {
                            changeStyleBoards(nowGoing[nstyle]);
                        }
                        onClicked = true;
                        onClickedNumber = n;
                        changeStyleBoard(n);
                        clickCount = 1;
                    } else {
                        for(let nstyle=0;nstyle<nowGoing.length;nstyle++) {
                            changeStyleBoardBack(nowGoing[nstyle]);
                        }
                        nowGoing = [];
                        onClicked = false;
                        onClickedNumber = 0;
                        changeStyleBoardBack(n)
                        clickCount = 0;
                    }  
                } 
            }
        })
    }
}
function edge(n, plus) {
    if(-2 < getWidth(n+plus)-getWidth(n) && getWidth(n+plus)-getWidth(n) < 2) {
        return true;
    } else {
        return false;
    }
} 
function redgeR(n) {
    if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
        return true;
    } else {
        return false;
    }
}
function redgeL(n) {
    if(n===1||n===10||n===19||n===28||n===37||n===46||n===55||n===64||n===73) {
        return true;
    } else {
        return false;
    }
}
function komaDeleter(nedInArrayFGeted, nedInArrayLGeted) {
    if (onClickedNumberGeted >= 10) {
        pieces[nedInArrayFGeted][nedInArrayLGeted] = onClickedNumberGeted/10;
        for (let nx = 0; nx < getedKomaMe.length; nx++) {
            if(getedKomaMe[nx] === onClickedNumberGeted) {
                getedKomaMe.splice(nx, 1);
                nx = 82;
            }
        }
    } else {
        pieces[nedInArrayFGeted][nedInArrayLGeted] = onClickedNumberGeted*10;
        for (let nx = 0; nx < getedKomaMe.length; nx++) {
            if(getedKomaYou[nx] === onClickedNumberGeted) {
                getedKomaYou.splice(nx, 1);
                nx = 82;
            }
        }
    }
}
function getedKomaAdder(komaNumber) {
    if(komaNumber>=10) {
        let newele = document.createElement("img");
        let getedKomaImage = choseKoma(komaNumber/10);
        newele.src = `/images/${getedKomaImage}`;
        getedKomaMe.push(komaNumber)
        newele.id = `${komaNumber*100}`;
        newele.name = `${komaNumber*100}`;
        document.getElementById("getedKomaMe").appendChild(newele);
        goPiecesGeted(komaNumber);
    } else if(komaNumber<10&&komaNumber!==0){
        let newele = document.createElement("img");
        let getedKomaImage = choseKoma(komaNumber);
        newele.src = `/images/${getedKomaImage}`;
        getedKomaYou.push(komaNumber)
        newele.style.transform = "rotate(180deg)"
        newele.id = `${komaNumber*100}`;
        newele.name = `${komaNumber*100}`;
        document.getElementById("getedKomaYou").appendChild(newele);
        goPiecesGeted(komaNumber);
    }
}
function goPiecesGeted(number) {
    let clickCount = 0;
    for(let i=0;i<document.getElementsByName(`${number*100}`).length;i++) {
        document.getElementsByName(`${number*100}`)[i].addEventListener("click", function() {
            if (clickCount === 0) {
                for(let n = 1;n <= 81; n++) {
                    if(getNumber(n) === 0) {
                        nowGoing.push(n);
                    }
                }
                for(let nstyle=0;nstyle<nowGoing.length;nstyle++) {
                    changeStyleBoards(nowGoing[nstyle]);
                }
                onClicked = true;
                onClickedNumberGeted  = number;
                changeStyleBoard(number*100);
                clickCount = 1;
            } else {
                for(let nstyle=0;nstyle<nowGoing.length;nstyle++) {
                    changeStyleBoardBack(nowGoing[nstyle]);
                }
                onClicked = false;
                onClickedNumberGeted  = number;
                document.getElementById(number*100).style.backgroundColor = "rgb(160, 135, 88)"
                clickCount = 0;
            }  
        })
    }

}
function changeStyleBoard(number) {
    document.getElementById(number).style.backgroundColor = "rgb(10, 103, 41)"
}
function changeStyleBoardBack(number) {
    document.getElementById(number).style.backgroundColor = "wheat"    
}
function changeStyleBoards(number) {
    document.getElementById(number).style.backgroundColor = "yellowgreen"
}
function getNumber(n) {
    if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
        return pieces[n/9-1][8];
    } else {
        return pieces[Math.floor(n/9)][Math.floor(n%9-1)];
    }
}
function getHeight(n) {
    if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
        return n/9-1;
    } else {
        return Math.floor(n/9);
    }
}
function getWidth(n) {
    if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
        return 9;
    } else {
        return n%9+1;
    }
}
function drawBoard() {
    let parents = document.getElementById("board");
    var parent = document.createElement("div");
    for (let n = 1; n <= 81; n++) {
        let newElement = document.createElement("div");
        if(n===1||n===10||n===19||n===28||n===37||n===46||n===55||n===64||n===73) {
            parent = document.createElement("div");
            parents.appendChild(parent);
            parent.className = "boardFloat";
            newElement.className = "boards";
            parent.appendChild(newElement);
        } else {
            newElement.className = "boards";
            parent.appendChild(newElement);
        }
        newElement.id = `${n}`;
    }
}
let pieces = [
    [20, 30, 40, 50, 80, 50, 40, 30, 20],
    [0, 60, 0, 0, 0, 0, 0, 70, 0],
    [10, 10, 10, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 7, 0, 0, 0, 0, 0, 6, 0],
    [2, 3, 4, 5, 8, 5, 4, 3, 2],
];
function drawPiecesBack() {
    document.getElementById("board").remove();
    let element = document.createElement("div");
    element.id = "board";
    element.className = "board";
    document.getElementById("body").append(element);
}
function drawPieces() { 
    for (let n = 0; n < pieces.length; n++) {
        for (let x = 0; x < pieces[n].length; x++) {
            let element = pieces[n][x];
            let newEle = document.createElement("img");
            if(element >= 10) {
                element/=10;
                newEle.style.transform = "rotate(180deg)"
            }
            const image = choseKoma(element);
            if(image != undefined) {
                newEle.src = `/images/${image}`;
                document.getElementById(`${n*9+x+1}`).appendChild(newEle);
            } else {
                newEle.src = "";
                document.getElementById(`${n*9+x+1}`).appendChild(newEle)
                newEle.style.display = "none"
            }
            
        }
    }
}
function choseKoma(number) {
    switch (number) {
        case 1:
            return "hu.png";   
        case 2:
            return "kyou.png";
        case 3:
            return "kei.png";   
        case 4:
            return "ginn.png";
        case 5:
            return "kinn.png";   
        case 6:
            return "hisya.png";
        case 7:
            return "kaku.png";   
        case 8:
            return "ousyou.png";
        default:
            break;
    }
}
function restrictPieces(komaNumber, komaShape) {
    let returnKomas = [];
    switch (komaShape) {
        case 1:
            if(komaNumber-9 > 0) {
                if(getNumber(komaNumber-9) >= 10 || getNumber(komaNumber-9) === 0) {
                    returnKomas.push(komaNumber-9);
                    return returnKomas;
                }
            } else {
                returnKomas.push(komaNumber)
                return returnKomas;
            }
        case 2:
            for (let n = komaNumber-9; n > 0; n-=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) >= 10) {
                        returnKomas.push(n);
                    }
                    return returnKomas;
                }
            }
            return returnKomas;
        case 3:
            if(getHeight(komaNumber) >= 2) {
                if(getNumber(komaNumber-19) >= 10 || getNumber(komaNumber-19) === 0) {
                    if(edge(komaNumber, -19)) {
                        returnKomas.push(komaNumber-19);
                    }
                }
                if(getNumber(komaNumber-17) >= 10 || getNumber(komaNumber-17) === 0) {
                    if(edge(komaNumber, -17)){
                        returnKomas.push(komaNumber-17);
                    }
                }
                return returnKomas;
            }
            return returnKomas;
        case 4:
            if(komaNumber-9 > 0) {
                if(getNumber(komaNumber-9) >= 10 || getNumber(komaNumber-9) === 0) {
                    returnKomas.push(komaNumber-9);
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(getNumber(komaNumber-8) >= 10 || getNumber(komaNumber-8) === 0) {
                        returnKomas.push(komaNumber-8);
                    }

                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(getNumber(komaNumber-10) >= 10 || getNumber(komaNumber-10) === 0) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(getNumber(komaNumber+8) >= 10 || getNumber(komaNumber+8) === 0) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(getNumber(komaNumber+10) >= 10 || getNumber(komaNumber+10) === 0) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            return returnKomas;
        case 5:
            if(komaNumber-9 > 0) {
                if(getNumber(komaNumber-9) >= 10 || getNumber(komaNumber-9) === 0) {
                    returnKomas.push(komaNumber-9);
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(getNumber(komaNumber-8) >= 10 || getNumber(komaNumber-8) === 0) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(getNumber(komaNumber-10) >= 10 || getNumber(komaNumber-10) === 0) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(getNumber(komaNumber-1) >= 10 || getNumber(komaNumber-1) === 0) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(getNumber(komaNumber+1) >= 10 || getNumber(komaNumber+1) === 0) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber+9 <= 81) {
                if(getNumber(komaNumber+9) >= 10 || getNumber(komaNumber+9) === 0) {
                    returnKomas.push(komaNumber+9);
                }
            }
            return returnKomas;
        case 6:
            for (let n = komaNumber-9; n > 0; n-=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) >= 10) {
                        returnKomas.push(n);
                    } 
                    n = 0;
                }
            }
            for (let n = komaNumber+9; n <= 81; n+=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) >= 10) {
                        returnKomas.push(n);
                    } 
                    n = 82;
                }
            }
            for (let n = komaNumber+1; n<=(getHeight(komaNumber)+1)*9;n++) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) >= 10) {
                        returnKomas.push(n);
                    }
                    n = 82;
                }
            }
            for (let n = komaNumber-1; n>=(getHeight(komaNumber)+1)*9+1-9;n--) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) >= 10) {
                        returnKomas.push(n);
                    }
                    n = 0;
                }
            }
            return returnKomas;
        case 7:
            let height = getHeight(komaNumber)
            for (let n = komaNumber; n > 0; n-=8) {
                if(!redgeR(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(getNumber(n) >= 10) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }

                } else {
                    if(n !== komaNumber) {
                        if(getNumber(n) >= 10 || getNumber(n) === 0) {
                            returnKomas.push(n);
                        } 
                    } 
                    n = 0;
                }
            }
            for (let n = komaNumber; n <= 81; n+=10) {
                if(!redgeR(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(getNumber(n) >= 10) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(getNumber(n) >= 10 || getNumber(n) === 0) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 82;
                }
            }
            for (let n = komaNumber; n > 0; n-=10) {
                if(!redgeL(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(getNumber(n) >= 10) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(getNumber(n) >= 10 || getNumber(n) === 0) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 0;
                }
            }
            for (let n = komaNumber; n <= 81; n+=8) {
                if(!redgeL(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(getNumber(n) >= 10) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(getNumber(n) >= 10 || getNumber(n) === 0) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 82;
                }
            }
            return returnKomas; 
        case 8:
            if(komaNumber-9 > 0) {
                if(getNumber(komaNumber-9) >= 10 || getNumber(komaNumber-9) === 0) {
                    returnKomas.push(komaNumber-9);
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(getNumber(komaNumber-8) >= 10 || getNumber(komaNumber-8) === 0) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(getNumber(komaNumber-10) >= 10 || getNumber(komaNumber-10) === 0) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(getNumber(komaNumber-1) >= 10 || getNumber(komaNumber-1) === 0) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(getNumber(komaNumber+1) >= 10 || getNumber(komaNumber+1) === 0) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber+9 <= 81) {
                if(getNumber(komaNumber+9) >= 10 || getNumber(komaNumber+9) === 0) {
                    returnKomas.push(komaNumber+9);
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(getNumber(komaNumber+8) >= 10 || getNumber(komaNumber+8) === 0) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(getNumber(komaNumber+10) >= 10 || getNumber(komaNumber+10) === 0) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            return returnKomas;
        case 10:
            if(komaNumber+9 <= 81) {
                if(getNumber(komaNumber-9) < 10 || getNumber(komaNumber+9) === 0) {
                    returnKomas.push(komaNumber+9);
                    return returnKomas;
                }
            } else {
                returnKomas.push(komaNumber)
                return returnKomas;
            }
            return returnKomas;
        case 20:
            for (let n = komaNumber+9; n <= 81; n+=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) < 10) {
                        returnKomas.push(n);
                    }
                    return returnKomas;
                }
            }
            return returnKomas;
        case 30:
            if(getHeight(komaNumber) <= 6) {
                if(edge(komaNumber, 19) && getNumber(komaNumber+19) < 10) {
                    returnKomas.push(komaNumber+19);
                }
                if(edge(komaNumber, 17) && getNumber(komaNumber+17) < 10) {
                    returnKomas.push(komaNumber+17);
                }
                return returnKomas;
            }
            return returnKomas;
        case 40:
            if(komaNumber+9 <= 81) {
                if(getNumber(komaNumber+9) < 10) {
                    returnKomas.push(komaNumber+9);
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(getNumber(komaNumber+8) < 10) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(getNumber(komaNumber+10) < 10) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(getNumber(komaNumber-8) < 10) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(getNumber(komaNumber-10) < 10) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            return returnKomas;
        case 50:
            if(komaNumber+9 <= 81) {
                if(getNumber(komaNumber+9) < 10) {
                    returnKomas.push(komaNumber+9);
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(getNumber(komaNumber+8) < 10) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(getNumber(komaNumber+10) < 10) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(getNumber(komaNumber+1) < 10) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(getNumber(komaNumber-1) < 10) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber-9 > 0) {
                if(getNumber(komaNumber-9) < 10) {
                    returnKomas.push(komaNumber-9);
                }
            }
            return returnKomas;
        case 60:
            for (let n = komaNumber-9; n > 0; n-=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) < 10) {
                        returnKomas.push(n);
                    } 
                    n = 0;
                }
            }
            for (let n = komaNumber+9; n <= 81; n+=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) < 10) {
                        returnKomas.push(n);
                    } 
                    n = 82;
                }
            }
            for (let n = komaNumber+1; n<=(getHeight(komaNumber)+1)*9;n++) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) < 10) {
                        returnKomas.push(n);
                    }
                    n = 82;
                }
            }
            for (let n = komaNumber-1; n>=(getHeight(komaNumber)+1)*9+1-9;n--) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(getNumber(n) < 10) {
                        returnKomas.push(n);
                    }
                    n = 0;
                }
            }
            return returnKomas;
        case 70:
            for (let n = komaNumber; n > 0; n-=8) {
                if(!redgeR(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(getNumber(n) < 10) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }

                } else {
                    if(n !== komaNumber) {
                        if(getNumber(n) < 10) {
                            returnKomas.push(n);
                        } 
                    } 
                    n = 0;
                }
            }
            for (let n = komaNumber; n <= 81; n+=10) {
                if(!redgeR(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(getNumber(n) < 10) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(getNumber(n) < 10) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 82;
                }
            }
            for (let n = komaNumber; n > 0; n-=10) {
                if(!redgeL(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(getNumber(n) < 10) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(getNumber(n) < 10) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 0;
                }
            }
            for (let n = komaNumber; n <= 81; n+=8) {
                if(!redgeL(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(getNumber(n) < 10) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(getNumber(n) < 10) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 82;
                }
            }
            return returnKomas; 
        case 80:
            if(komaNumber+9 <= 81) {
                if(getNumber(komaNumber+9) < 10) {
                    returnKomas.push(komaNumber+9);
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(getNumber(komaNumber+8) < 10) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(getNumber(komaNumber+10) < 10) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(getNumber(komaNumber-8) < 10) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(getNumber(komaNumber-10) < 10) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(getNumber(komaNumber+1) < 10) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(getNumber(komaNumber-1) < 10) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber-9 > 0) {
                if(getNumber(komaNumber-9) < 10) {
                    returnKomas.push(komaNumber-9);
                }
            }
            return returnKomas;
        default:
            break;
    }
}