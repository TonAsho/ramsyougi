console.log("Hello, World!");
window.onload = function() {
    drawBoard();
    drawPieces();
    goPieces();
}
let senteNumber = Math.floor(Math.random() * 1);
let goteNumber;
if(senteNumber === 0) {
    goteNumber = 1;
} else {
    goteNumber = 0;
}
let getedKomaMe = {};
let getedKomaYou = {};
let komaCount = 0;
let onClicked = false;
let onClickedNumber = 0;
let onClickedNumberGeted = 0;
let nowGoing = [];
let average = 100;
let onAverage = 0;
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
                            pieces[nedInArrayFGeted][nedInArrayLGeted] = onClickedNumberGeted;
                            let there = false;
                            for (let key in getedKomaMe) {
                                if(!there) {
                                    if(getedKomaMe[onAverage] === getedKomaMe[key]) {
                                        delete getedKomaMe[onAverage];
                                        there = true;
                                    }   

                                }
                            }
                            if(!there) {
                                for (let key in getedKomaYou) {
                                    if(getedKomaYou[onAverage] === getedKomaYou[key]) {
                                        there = true;
                                    }
                                }
                            }
                            ///komaDeleter(nedInArrayFGeted, nedInArrayLGeted);
                            document.getElementById(`${onClickedNumberGeted}`).remove();
                            onClickedNumberGeted = 0;
                            onClicked = false;
                            komaCount++;
                            nowGoing.length = 0;
                            cleanGeted()
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
                            getedKomaAdder(pieces[nedInArrayF][nedInArrayL]); 
                            if(pieces[clickedKomaInArrayF][clickedKomaInArrayL] >= 10 || pieces[clickedKomaInArrayF][clickedKomaInArrayL] <= -10) {
                                if(nedInArrayF >= 6 || clickedKomaInArrayF >= 6) {
                                    if(pieces[clickedKomaInArrayF][clickedKomaInArrayL] !== 80 && pieces[clickedKomaInArrayF][clickedKomaInArrayL] !== 50 && pieces[clickedKomaInArrayF][clickedKomaInArrayL] >= 0) {
                                        if(confirm("成りますか?")) {
                                            pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL]*-1;
                                            pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0;     
                                        } else {
                                            pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL];
                                            pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0; 
                                        }
                                    } else {
                                        pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL];
                                        pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0; 
                                    }
                                } else {
                                    pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL];
                                    pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0; 
                                }
                            } else {
                                if(nedInArrayF <= 2 || clickedKomaInArrayF <= 2) {
                                    if(pieces[clickedKomaInArrayF][clickedKomaInArrayL] !== 8 && pieces[clickedKomaInArrayF][clickedKomaInArrayL] !== 5 && pieces[clickedKomaInArrayF][clickedKomaInArrayL] >= 0) {
                                        if(confirm("成りますか?")) {
                                            pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL]*-1;
                                            pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0;     
                                        } else {
                                            pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL];
                                            pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0; 
                                        }
                                    } else {
                                        pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL];
                                        pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0; 
                                    }
                                } else {
                                    pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL];
                                    pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0; 
                                }
                            }
                            changeStyleBoardBack(onClickedNumber);            
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
                cleanGeted();
                drawPiecesBack();
                drawBoard();
                drawPieces();
                goPieces();
            } else {
                    if(isOk(n)&&komaCount%2===goteNumber || isOkYour(n)&&komaCount%2===senteNumber){
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
        getedKomaMe[average] = komaNumber/10;
        newele.id = `${average}`;
        document.getElementById("getedKomaMe").appendChild(newele);
        goPiecesGeted(average);
        average++;
    } else if(komaNumber<10&&komaNumber>0){
        let newele = document.createElement("img");
        let getedKomaImage = choseKoma(komaNumber);
        newele.src = `/images/${getedKomaImage}`;
        getedKomaYou[average] = komaNumber*10;
        newele.style.transform = "rotate(180deg)"
        newele.id = `${average}`
        document.getElementById("getedKomaYou").appendChild(newele);
        goPiecesGeted(average);
        average++;
    } else if(komaNumber<0&&komaNumber>-10) {
        let newele = document.createElement("img");
        let getedKomaImage = choseKoma(komaNumber*-1);
        newele.src = `/images/${getedKomaImage}`;
        getedKomaYou[average] = komaNumber*-10;
        newele.id = `${average}`
        newele.style.transform = "rotate(180deg)"
        document.getElementById("getedKomaYou").appendChild(newele);
        goPiecesGeted(average);
        average++;
    } else if(komaNumber <= -10) {
        let newele = document.createElement("img");
        let getedKomaImage = choseKoma(komaNumber*-0.1);
        newele.src = `/images/${getedKomaImage}`;
        getedKomaMe[average] = komaNumber*-0.1;
        newele.id = `${average}`
        document.getElementById("getedKomaMe").appendChild(newele);
        goPiecesGeted(average);
        average++;
    }
}
function goPiecesGeted(average) {
    let clickCount = 0;
    let numbers;
    for (let key in getedKomaMe) {
        if(getedKomaMe[average] === getedKomaMe[key]) {
            numbers =getedKomaMe[average];
        }   
    }
    for (let key in getedKomaYou) {
        if(getedKomaYou[average] === getedKomaYou[key]) {
            numbers =getedKomaYou[average];
        }
    }
    document.getElementById(`${average}`).addEventListener("click", function() {
        if(isOk4(numbers)&&komaCount%2===goteNumber || isOk3(numbers)&&komaCount%2===senteNumber) {
            if (clickCount === 0) {
                if(numbers === 1) {
                    for(let n=0;n<9;n+=1) {
                        let isis = true;
                        for(let nxy = 0;nxy<9;nxy+=1) {
                            if(pieces[nxy][n] === 1) {
                                isis = false;
                                nxy = 9;
                            }
                        }
                        if(isis) {
                            for(let nn = n+1;nn < 82; nn+=9) {
                                if(getNumber(nn) === 0&&!isBottom(nn)) {
                                    nowGoing.push(nn);
                                }
                            }
                        }
                    }
                }else if(numbers === 10) {
                    for(let n=0;n<9;n+=1) {
                        let isis = true;
                        for(let nxy = 0;nxy<9;nxy+=1) {
                            if(pieces[nxy][n] === 10) {
                                isis = false;
                                nxy = 9;
                            }
                        }
                        if(isis) {
                            for(let nn = n+1;nn < 82; nn+=9) {
                                if(getNumber(nn) === 0&&!isBottom2(nn)) {
                                    nowGoing.push(nn);
                                }
                            }
                        }
                    }
                } else if(numbers===2){
                    for(let n = 1;n <= 81; n++) {
                        if(getNumber(n) === 0&&!isBottom(n)) {
                            nowGoing.push(n);
                        }
                    }
                } else if(numbers === 20) {
                    for(let n = 1;n <= 81; n++) {
                        if(getNumber(n) === 0&&!isBottom2(n)) {
                            nowGoing.push(n);
                        }
                    }
                } else if(numbers === 3) {
                    for(let n = 1;n <= 81; n++) {
                        if(getNumber(n) === 0&&getHeight(n)>1) {
                            nowGoing.push(n);
                        }
                    }
                } else if(numbers === 30){
                    for(let n = 1;n <= 81; n++) {
                        if(getNumber(n) === 0&&getHeight(n)<6) {
                            nowGoing.push(n);
                        }
                    }
                }else {
                    for(let n = 1;n <= 81; n++) {
                        if(getNumber(n) === 0) {
                            nowGoing.push(n);
                        }
                    }
                }
                for(let nstyle=0;nstyle<nowGoing.length;nstyle++) {
                    changeStyleBoards(nowGoing[nstyle]);
                }
                onClicked = true;
                onAverage = average;
                onClickedNumberGeted  = numbers;
                changeStyleBoard(`${average}`);
                clickCount = 1;
            } else {
                for(let nstyle=0;nstyle<nowGoing.length;nstyle++) {
                    changeStyleBoardBack(nowGoing[nstyle]);
                }
                onClicked = false;
                onAverage = 0;
                onClickedNumberGeted  = 0;
                document.getElementById(`${average}`).style.backgroundColor = "rgb(160, 135, 88)"
                clickCount = 0;
            }  
        }
    })
    

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
            if(element >= 10 || element <= -10) {
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
        case -1:
            return "n_hu.png";   
        case -2:
            return "n_kyou.png";
        case -3:
            return "n_kei.png";   
        case -4:
            return "n_ginn.png";
        case -5:
            return "n_kinn.png";   
        case -6:
            return "n_hisya.png";
        case -7:
            return "n_kaku.png";   
        default:
            break;
    }
}
function restrictPieces(komaNumber, komaShape) { 
    let returnKomas = [];
    switch (komaShape) {
        case 1:
            if(komaNumber-9 > 0) {
                if(isOk(komaNumber-9)) {
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
                    if(isOk(n)) {
                        returnKomas.push(n);
                    }
                    return returnKomas;
                }
            }
            return returnKomas;
        case 3:
            if(getHeight(komaNumber) >= 2) {
                if(isOk(komaNumber-19)) {
                    if(edge(komaNumber, -19)) {
                        returnKomas.push(komaNumber-19);
                    }
                }
                if(isOk(komaNumber-17)) {
                    if(edge(komaNumber, -17)){
                        returnKomas.push(komaNumber-17);
                    }
                }
                return returnKomas;
            }
            return returnKomas;
        case 4:
            if(komaNumber-9 > 0) {
                if(isOk(komaNumber-9)) {
                    returnKomas.push(komaNumber-9);
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(isOk(komaNumber-8)) {
                        returnKomas.push(komaNumber-8);
                    }

                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(isOk(komaNumber-10)) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(isOk(komaNumber+8)) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(isOk(komaNumber+10)) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            return returnKomas;
        case 5:
        case -1:
        case -2:
        case -3:
        case -4:
            if(komaNumber-9 > 0) {
                if(isOk(komaNumber-9)) {
                    returnKomas.push(komaNumber-9);
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(isOk(komaNumber-8)) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(isOk(komaNumber-10)) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(isOk(komaNumber-1)) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(isOk(komaNumber+1)) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber+9 <= 81) {
                if(isOk(komaNumber+9)) {
                    returnKomas.push(komaNumber+9);
                }
            }
            return returnKomas;
        case 6:
            for (let n = komaNumber-9; n > 0; n-=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOk(n)) {
                        returnKomas.push(n);
                    } 
                    n = 0;
                }
            }
            for (let n = komaNumber+9; n <= 81; n+=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOk(n)) {
                        returnKomas.push(n);
                    } 
                    n = 82;
                }
            }
            for (let n = komaNumber+1; n<=(getHeight(komaNumber)+1)*9;n++) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOk(n)) {
                        returnKomas.push(n);
                    }
                    n = 82;
                }
            }
            for (let n = komaNumber-1; n>=(getHeight(komaNumber)+1)*9+1-9;n--) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOk(n)) {
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
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }

                } else {
                    if(n !== komaNumber) {
                        if(isOk(n)) {
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
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOk(n)) {
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
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOk(n)) {
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
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 82;
                }
            }
            return returnKomas; 
        case 8:
            if(komaNumber-9 > 0) {
                if(isOk(komaNumber-9)) {
                    returnKomas.push(komaNumber-9);
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(isOk(komaNumber-8)) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(isOk(komaNumber-10)) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(isOk(komaNumber-1)) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(isOk(komaNumber+1)) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber+9 <= 81) {
                if(isOk(komaNumber+9)) {
                    returnKomas.push(komaNumber+9);
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(isOk(komaNumber+8)) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(isOk(komaNumber+10)) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            return returnKomas;
        case 10:
            if(komaNumber+9 <= 81) {
                if(isOkYour(komaNumber+9)) {
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
                    if(isOkYour(komaNumber+9)) {
                        returnKomas.push(n);
                    }
                    return returnKomas;
                }
            }
            return returnKomas;
        case 30:
            if(getHeight(komaNumber) <= 6) {
                if(edge(komaNumber, 19) && isOkYour(komaNumber+19)) {
                    returnKomas.push(komaNumber+19);
                }
                if(edge(komaNumber, 17) && isOkYour(komaNumber+17)) {
                    returnKomas.push(komaNumber+17);
                }
                return returnKomas;
            }
            return returnKomas;
        case 40:
        case -40:
            if(komaNumber+9 <= 81) {
                if(isOkYour(komaNumber+9)) {
                    returnKomas.push(komaNumber+9);
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(isOkYour(komaNumber+8)) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(isOkYour(komaNumber+10)) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(isOkYour(komaNumber-8)) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(isOkYour(komaNumber-10)) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            return returnKomas;
        case 50:
        case -10:
        case -20:
        case -30:
            if(komaNumber+9 <= 81) {
                if(isOkYour(komaNumber+9)) {
                    returnKomas.push(komaNumber+9);
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(isOkYour(komaNumber+8)) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(isOkYour(komaNumber+10)) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(isOkYour(komaNumber+1)) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(isOkYour(komaNumber-1)) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber-9 > 0) {
                if(isOkYour(komaNumber-9)) {
                    returnKomas.push(komaNumber-9);
                }
            }
            return returnKomas;
        case 60:
            for (let n = komaNumber-9; n > 0; n-=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOkYour(n)) {
                        returnKomas.push(n);
                    } 
                    n = 0;
                }
            }
            for (let n = komaNumber+9; n <= 81; n+=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOkYour(n)) {
                        returnKomas.push(n);
                    } 
                    n = 82;
                }
            }
            for (let n = komaNumber+1; n<=(getHeight(komaNumber)+1)*9;n++) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOkYour(n)) {
                        returnKomas.push(n);
                    }
                    n = 82;
                }
            }
            for (let n = komaNumber-1; n>=(getHeight(komaNumber)+1)*9+1-9;n--) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOkYour(n)) {
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
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }

                } else {
                    if(n !== komaNumber) {
                        if(isOkYour(n)) {
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
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOkYour(n)) {
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
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOkYour(n)) {
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
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 82;
                }
            }
            return returnKomas; 
        case 80:
            if(komaNumber+9 <= 81) {
                if(isOkYour(komaNumber+9)) {
                    returnKomas.push(komaNumber+9);
                }
            }
            if(komaNumber+8 <= 81) {
                if(edge(komaNumber, 8)) {
                    if(isOkYour(komaNumber+8)) {
                        returnKomas.push(komaNumber+8);
                    }
                }
            }
            if(komaNumber+10 <= 81) {
                if(edge(komaNumber, 10)) {
                    if(isOkYour(komaNumber+10)) {
                        returnKomas.push(komaNumber+10);
                    }
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(isOkYour(komaNumber-8)) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(isOkYour(komaNumber-10)) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(isOkYour(komaNumber+1)) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(isOkYour(komaNumber-1)) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber-9 > 0) {
                if(isOkYour(komaNumber-9)) {
                    returnKomas.push(komaNumber-9);
                }
            }
            return returnKomas;
        case -6:
            for (let n = komaNumber-9; n > 0; n-=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOk(n)) {
                        returnKomas.push(n);
                    } 
                    n = 0;
                }
            }
            for (let n = komaNumber+9; n <= 81; n+=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOk(n)) {
                        returnKomas.push(n);
                    } 
                    n = 82;
                }
            }
            for (let n = komaNumber+1; n<=(getHeight(komaNumber)+1)*9;n++) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOk(n)) {
                        returnKomas.push(n);
                    }
                    n = 82;
                }
            }
            for (let n = komaNumber-1; n>=(getHeight(komaNumber)+1)*9+1-9;n--) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOk(n)) {
                        returnKomas.push(n);
                    }
                    n = 0;
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(isOk(komaNumber-8)) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(isOk(komaNumber-10)) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            return returnKomas;
        case -7:
            for (let n = komaNumber; n > 0; n-=8) {
                if(!redgeR(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }

                } else {
                    if(n !== komaNumber) {
                        if(isOk(n)) {
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
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOk(n)) {
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
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOk(n)) {
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
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOk(n)) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 82;
                }
            }
            if(komaNumber-9 > 0) {
                if(isOk(komaNumber-9)) {
                    returnKomas.push(komaNumber-9);
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(isOk(komaNumber-1)) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(isOk(komaNumber+1)) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber+9 <= 81) {
                if(isOk(komaNumber+9)) {
                    returnKomas.push(komaNumber+9);
                }
            }
            return returnKomas; 
        case -60:
            for (let n = komaNumber-9; n > 0; n-=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOkYour(n)) {
                        returnKomas.push(n);
                    } 
                    n = 0;
                }
            }
            for (let n = komaNumber+9; n <= 81; n+=9) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOkYour(n)) {
                        returnKomas.push(n);
                    } 
                    n = 82;
                }
            }
            for (let n = komaNumber+1; n<=(getHeight(komaNumber)+1)*9;n++) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOkYour(n)) {
                        returnKomas.push(n);
                    }
                    n = 82;
                }
            }
            for (let n = komaNumber-1; n>=(getHeight(komaNumber)+1)*9+1-9;n--) {
                if(getNumber(n) === 0) {
                    returnKomas.push(n);
                } else {
                    if(isOkYour(n)) {
                        returnKomas.push(n);
                    }
                    n = 0;
                }
            }
            if(komaNumber-9 > 0) {
                if(isOk(komaNumber-9)) {
                    returnKomas.push(komaNumber-9);
                }
            }
            if(komaNumber-8 > 0) {
                if(edge(komaNumber, -8)) {
                    if(isOk(komaNumber-8)) {
                        returnKomas.push(komaNumber-8);
                    }
                }
            }
            if(komaNumber-10 > 0) {
                if(edge(komaNumber, -10)) {
                    if(isOk(komaNumber-10)) {
                        returnKomas.push(komaNumber-10);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(isOk(komaNumber-1)) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(isOk(komaNumber+1)) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber+9 <= 81) {
                if(isOk(komaNumber+9)) {
                    returnKomas.push(komaNumber+9);
                }
            }
            return returnKomas;
        case -70:
            for (let n = komaNumber; n > 0; n-=8) {
                if(!redgeR(n)) {
                    if(getNumber(n) === 0) {
                        returnKomas.push(n);
                    } else {
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }

                } else {
                    if(n !== komaNumber) {
                        if(isOkYour(n)) {
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
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOkYour(n)) {
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
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 0;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOkYour(n)) {
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
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                        if(n !== komaNumber) {
                            n = 82;
                        }
                    }
                } else {
                    if(n !== komaNumber) {
                        if(isOkYour(n)) {
                            returnKomas.push(n);
                        } 
                    }
                    n = 82;
                }
            }
            if(komaNumber+9 <= 81) {
                if(isOkYour(komaNumber+9)) {
                    returnKomas.push(komaNumber+9);
                }
            }
            if(komaNumber+1 <= 81) {
                if(edge(komaNumber, 1)) {
                    if(isOkYour(komaNumber+1)) {
                        returnKomas.push(komaNumber+1);
                    }
                }
            }
            if(komaNumber-1 > 0) {
                if(edge(komaNumber, -1)) {
                    if(isOkYour(komaNumber-1)) {
                        returnKomas.push(komaNumber-1);
                    }
                }
            }
            if(komaNumber-9 > 0) {
                if(isOkYour(komaNumber-9)) {
                    returnKomas.push(komaNumber-9);
                }
            }
            return returnKomas; 
            default:
                return returnKomas;
    }
}
function isOk(number) {
    if(getNumber(number)>=10||getNumber(number)=== 0||getNumber(number)<=-10) {
        return true;
    } else {
        return false;
    }
}
function isOkYour(number) {
    if(getNumber(number)<10&&getNumber(number)>-10) {
        return true;
    } else {
        return false;
    }
}
function isOk3(number) {
    if(number<10) {
        return true;
    } else {
        return false;
    }
}
function isOk4(number) {
    if(number<10) {
        return true;
    } else {
        return false;
    }
}
function isBottom(number) {
    for (let n = 1; n <= 9; n++) {
        if(n === number) {
            return true;
        } 
    }
    return false;
}
function isBottom2(number) {
    for (let n = 73; n <= 81; n++) {
        if(n === number) {
            return true;
        } 
    }
    return false;
}
function cleanGeted() {
    ///今日はここから
    for (let n = 0; n < getedKomaMe.length; n++) {
        const element = getedKomaMe[n];
        
    }
}