function $(selector){
    return document.querySelector(selector)
}
//获取dom
const container=$('.container')
const checkerboard=$('.checkerboard')
//定义棋子的颜色
let chessColor='black'
//记录所有棋子的位置
let chessArr=[]
//保存游戏状态
let isGameOver=false
//保存获胜的棋子
let gainArr=[]

//初始化棋盘
function initCheckerboard(){
    //生成14*14的棋盘(每个td带有行和列的自定义属性)
    for(let i=0;i<14;i++){
        let html='<tr>'
        for(let j=0;j<14;j++){
            html+=`<td data-row=${i} data-col=${j}></td>`
        }
        html+='</tr>'
        checkerboard.innerHTML+=html
    }
}

//点击棋盘获取相关位置的行和列信息
function getPosition(e){
    if(e.target.tagName==='TD'){//点击的是td
        //e.offsetX和e.offsetY为鼠标距离所点击的td的左上角的距离
        //根据这个信息我们定义生成的棋子的坐标和颜色
        //获取所点击棋子的行和列信息
        let {row,col}=e.target.dataset
        row=Number(row)
        col=Number(col)
        if(e.offsetX>e.target.offsetWidth/2){
            col++
        }
        if(e.offsetY>e.target.offsetHeight/2){
            row++
        }
        //修改当前棋子颜色
        chessColor==='white'?chessColor='black':chessColor='white'
        let pos={
            row,
            col,
            chessColor
        }

        //判断是否有棋子在该位置
        let result=chessArr.includes(item=>item.row===pos.row && item.col===pos.col)
        if(!result && !isGameOver){//该位置不存在棋子并且游戏未结束
            //记录棋子的位置
            chessArr.push(pos)
            //生成棋子,把pos当作参数传过去
            createChess(pos)
            //判断游戏状态
            gainArr=gameOver()
        }  
        if(isGameOver){
            let isAgain=window.confirm('是否重新开始游戏！')
            if(!isAgain){
                //给所有的棋子加上下棋字体顺序
                chessArr.forEach((item,index)=>{
                    //获取棋子
                    const chess=$(`div[data-row='${item.row}'][data-col='${item.col}']`)
                    chess.innerHTML=index+1

                    //给获胜数组的每一个棋子加上特殊样式
                    gainArr.forEach(it=>{
                        const chess=$(`div[data-row='${it.row}'][data-col='${it.col}']`)
                        chess.classList.add('red')
                    })
                })
            }else{
                checkerboard.innerHTML=''
                initCheckerboard()
                //定义棋子的颜色
                chessColor='black'
                //记录所有棋子的位置
                chessArr=[]
                //保存游戏状态
                isGameOver=false
                //保存获胜的棋子
                gainArr=[]
            }

        }
    }else{
        return
    }
}

//生成棋子的函数
function createChess(pos){
    const chessHtml=`<div class="chess ${pos.chessColor}" data-row=${pos.row} data-col=${pos.col}></div>`
    let row=pos.row
    let col=pos.col
    //特殊处理
    //如果棋子在行的最后一个位置
    if(pos.row===14){
       row=13
    }
    if(pos.col===14){
        col=13
    }

    //获取当前td对象
    const td=$(`td[data-row='${row}'][data-col='${col}']`)
    td.innerHTML+=chessHtml

    //特殊样式处理
    if(pos.col===14){
        const chess=$(`div[data-row='${pos.row}'][data-col='${pos.col}']`)
        chess.style.left='50%'
    }
    if(pos.row===14){
        const chess=$(`div[data-row='${pos.row}'][data-col='${pos.col}']`)
        chess.style.top='50%'
    }
}

//判断游戏是否结束
function gameOver(){
    let result=[]
    //循环chessArr
    chessArr.forEach(item=>{
        //定义当前的棋子
        let currentChess=item
        let chess2,chess3,chess4,chess5
        //判断横向的棋子
        chess2=chessArr.find(it=>{
            return it.row===currentChess.row && it.col===currentChess.col+1 && it.chessColor===currentChess.chessColor
        })
        chess3=chessArr.find(it=>{
            return it.row===currentChess.row && it.col===currentChess.col+2 && it.chessColor===currentChess.chessColor
        })
        chess4=chessArr.find(it=>{
            return it.row===currentChess.row && it.col===currentChess.col+3 && it.chessColor===currentChess.chessColor
        })
        chess5=chessArr.find(it=>{
            return it.row===currentChess.row && it.col===currentChess.col+4 && it.chessColor===currentChess.chessColor
        })
        if(chess2 && chess3 && chess4 && chess5){
            isGameOver=true
            result=[currentChess,chess2,chess3,chess4,chess5]
        }

        //判断纵向的棋子
        chess2=chessArr.find(it=>{
            return it.row===currentChess.row+1 && it.col===currentChess.col && it.chessColor===currentChess.chessColor
        })
        chess3=chessArr.find(it=>{
            return it.row===currentChess.row+2 && it.col===currentChess.col && it.chessColor===currentChess.chessColor
        })
        chess4=chessArr.find(it=>{
            return it.row===currentChess.row+3 && it.col===currentChess.col && it.chessColor===currentChess.chessColor
        })
        chess5=chessArr.find(it=>{
            return it.row===currentChess.row+4 && it.col===currentChess.col && it.chessColor===currentChess.chessColor
        })
        if(chess2 && chess3 && chess4 && chess5){
            isGameOver=true
            result=[currentChess,chess2,chess3,chess4,chess5]
        }

        //判断右下倾斜的棋子
        chess2=chessArr.find(it=>{
            return it.row===currentChess.row+1 && it.col===currentChess.col+1 && it.chessColor===currentChess.chessColor
        })
        chess3=chessArr.find(it=>{
            return it.row===currentChess.row+2 && it.col===currentChess.col+2 && it.chessColor===currentChess.chessColor
        })
        chess4=chessArr.find(it=>{
            return it.row===currentChess.row+3 && it.col===currentChess.col+3 && it.chessColor===currentChess.chessColor
        })
        chess5=chessArr.find(it=>{
            return it.row===currentChess.row+4 && it.col===currentChess.col+4 && it.chessColor===currentChess.chessColor
        })
        if(chess2 && chess3 && chess4 && chess5){
            isGameOver=true
            result=[currentChess,chess2,chess3,chess4,chess5]
        }

        //判断左下倾斜的棋子
        chess2=chessArr.find(it=>{
            return it.row===currentChess.row+1 && it.col===currentChess.col-1 && it.chessColor===currentChess.chessColor
        })
        chess3=chessArr.find(it=>{
            return it.row===currentChess.row+2 && it.col===currentChess.col-2 && it.chessColor===currentChess.chessColor
        })
        chess4=chessArr.find(it=>{
            return it.row===currentChess.row+3 && it.col===currentChess.col-3 && it.chessColor===currentChess.chessColor
        })
        chess5=chessArr.find(it=>{
            return it.row===currentChess.row+4 && it.col===currentChess.col-4 && it.chessColor===currentChess.chessColor
        })
        if(chess2 && chess3 && chess4 && chess5){
            isGameOver=true
            result=[currentChess,chess2,chess3,chess4,chess5]
        }

    })
    return result
}


//事件绑定入口
function initEvent(){
    checkerboard.addEventListener('click',getPosition)
}

//入口函数
function init(){
    initEvent()
    initCheckerboard()
}

init()