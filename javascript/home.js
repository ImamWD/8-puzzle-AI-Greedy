let inputErr = document.getElementById('err');
inputErr.style = "display:none";
let space = document.getElementById('Non-block');
let box = document.getElementById('fram');
let GG = document.getElementById('fram1');
let speed = document.getElementById('select');
let moveButtons = document.getElementsByClassName('move');
let AIselect = document.getElementById('select1');
let Heselect = document.getElementById('select2');
let Greedy_old_state =[];
let Goal = [];
let Goal_Obj = [];
let Node_Arr = [];
let Space_position;
let deltaX ;
let deltaY ;
let Ast = [];
let Node_Arr2 = [];
let Node_Arr3 =[];

function disabledbtn()
{
    for(var i =0 ;i<6;i++)
    {
        moveButtons[i].classList.add('disabled');
    }
}
function enabledbtn()
{
    for(var i =0 ;i<6;i++)
    {
        moveButtons[i].classList.remove('disabled');
    }
}
function End()
{
    enabledbtn();
}
function Refresh()
{
    location.reload();
}
function Start()
{
    Greedy_old_state =[];
    disabledbtn()
    let AlgoSpeed=0;
     if(speed.value == 1)
     {
        AlgoSpeed = 500;
     }
     else if(speed.value == 2)
     {
        AlgoSpeed = 400;
     }
     else if(speed.value == 3)
     {
        AlgoSpeed = 300;
     }
     else
     {
        AlgoSpeed = 150;
    }
    if(AIselect.value == 1 && Heselect.value == 1)
    {
        Greedy(AlgoSpeed);
    }
    else if(AIselect.value == 1 && Heselect.value == 2)
    {
        GreedyMD(AlgoSpeed);
    }
    else if(AIselect.value == 2 && Heselect.value == 1)
    {
       AStar(AlgoSpeed);
    }
    else
    {
        AStarHill(AlgoSpeed);
        
    }
}
// input initial state
async function sweetinputs()
{
    inputErr.style = "display:none";
    const { value: formValues } = await Swal.fire({
        title: 'Please enter initial state',
        confirmButtonText: 'Confirmation',
        confirmButtonColor: '#000000',
        html:  `
        <div class="init-all"> 
               <div class="init-input" >
                  <input type="number" id="swal-input0" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input1" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input2" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input3" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input4" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input5" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input6" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input7" class="num-input">
               </div>

               <div class="init-input" >
                  <input type="number" id="swal-input8" class="num-input">
               </div>

               
        </div>
                `,
       
        focusConfirm: true,
        preConfirm: () => {
            return [
                document.getElementById('swal-input0').value,
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value,
                document.getElementById('swal-input5').value,
                document.getElementById('swal-input6').value,
                document.getElementById('swal-input7').value,
                document.getElementById('swal-input8').value,

            ]
        }
    })
    if (formValues) {
        initValidation(formValues,0);
       
    }
}
sweetinputs();
async function sweetGoalInputs()
{
  
    const { value: formValues } = await Swal.fire({
        title: 'Please enter Goal state',
        confirmButtonText: 'Start',
        confirmButtonColor: '#000000',
        html:  `
        <div class="init-all"> 
               <div class="init-input" >
                  <input type="number" id="swal-input00" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input11" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input22" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input33" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input44" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input55" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input66" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input77" class="num-input">
               </div>
               <div class="init-input" >
                  <input type="number" id="swal-input88" class="num-input">
               </div>
               
        </div>
                `,
       
        focusConfirm: true,
        preConfirm: () => {
            return [
                document.getElementById('swal-input00').value,
                document.getElementById('swal-input11').value,
                document.getElementById('swal-input22').value,
                document.getElementById('swal-input33').value,
                document.getElementById('swal-input44').value,
                document.getElementById('swal-input55').value,
                document.getElementById('swal-input66').value,
                document.getElementById('swal-input77').value,
                document.getElementById('swal-input88').value,

            
            ]
        }
    })
    if (formValues) {
        initValidation(formValues,1);
    }
}
function initValidation(Arritem,flag)
{
    let i =0;
    for(i =0;i<9;i++)
    {
        if(Arritem[i] >=0 && Arritem[i]<=8)
        {
            let count =0;
            let j =0;
           for(j = 0 ; j<9;j++)
           {
             if(Arritem[i] == Arritem[j])
             {
                count++;
             }
           }
           if(count > 1)
           {
             if(flag == 0)
             inputErr.innerHTML = `There is a repetition of the initial elements, <a href="#" onclick="sweetinputs()">try again</a>`;
             if(flag == 1)
             inputErr.innerHTML = `There is a repetition of the Goal elements,  <a href="#" onclick="sweetinputs()">try again</a>`;
             inputErr.style = "display:block";
             clear();
             break;
           }
        }
        else
        {
            if(flag == 0)
            inputErr.innerHTML = `There was a problem entering the initial values. Pleace  <a href="#" onclick="sweetinputs()">try again</a>: data range 0 - 8 and not NULL values`;
            if(flag == 1)
            inputErr.innerHTML = `There was a problem entering the Goal values. Pleace  <a href="#" onclick="sweetinputs()">try again</a>: data range 0 - 8 and not NULL values`;
            inputErr.style = "display:block";
            clear();
            break;
        }
        
    }
    if(i == 9 && flag == 0)
    {
       save_initData(Arritem);
       sweetGoalInputs();
    }
    else if(i ==9  && flag == 1 )
    {
        store_Goal(Arritem);
    }
}
function save_initData(Arr)
{
    box.innerHTML = "";
    let i =0;
    for(i =0 ;i<9;i++)
    {
        if(Arr[i] != 0)
        {
            box.innerHTML += `
            <div class="inner-block" id="I${i+1}">
            <h1 class="number">${Arr[i]}</h1>
            </div>`
        }
        else
        {
            box.innerHTML +=
            ` 
            <div class="inner-block" id="Non-block">
            </div>
            `;
        }
    }
    let Nodes = document.getElementsByClassName('inner-block');
    Nodes[0].style.top = "1%"; 
    Nodes[0].style.left = "1%"; 

    Nodes[1].style.top = "1%"; 
    Nodes[1].style.left = "33%";

    Nodes[2].style.top = "1%"; 
    Nodes[2].style.left = "65%"; 

    Nodes[3].style.top = "33%"; 
    Nodes[3].style.left = "1%"; 

    Nodes[4].style.top = "33%"; 
    Nodes[4].style.left = "33%";

    Nodes[5].style.top = "33%"; 
    Nodes[5].style.left = "65%"; 

    Nodes[6].style.top = "65%"; 
    Nodes[6].style.left = "1%"; 

    Nodes[7].style.top = "65%"; 
    Nodes[7].style.left = "33%"; 

    Nodes[8].style.top = "65%"; 
    Nodes[8].style.left = "65%"; 

    let k = 0;
    for(k =0 ; k<9 ;k++)
    {
        var rect = Nodes[k].style;
        let x1 = rect.left.split('%');
        let x2 = rect.top.split('%');

        Node_Arr[k] = 
        {
            'value' : Arr[k] ,
            'X' : parseFloat(x1[0]),
            'Y' : parseFloat(x2[0]),
            'item' : Nodes[k]
        }
        Node_Arr2 [k] =
        {
            'value' : Arr[k] ,
            'X' : parseFloat(x1[0]),
            'Y' : parseFloat(x2[0]),
            'item' : Nodes[k]
        }
        Node_Arr3 [k] =
        {
            'value' : Arr[k] ,
            'X' : parseFloat(x1[0]),
            'Y' : parseFloat(x2[0]),
            'item' : Nodes[k]
        }
    if(Arr[k] == 0)
    {
        var R = Nodes[k].style;
        let X1 = R.left.split('%');
        let Y1 = R.top.split('%');
        Space_position =
        {
            'X' : parseFloat(X1[0]) ,
            'Y' : parseFloat(Y1[0]),
            'item' : Nodes[k] 
        }
    }
    }
    //space initial position
    deltaX = Node_Arr[1].X - Node_Arr[0].X;
    deltaY = Node_Arr[3].Y - Node_Arr[0].Y;
    inputErr.innerHTML ="";
    inputErr.style = "display:none";
}
function store_Goal(Arr)
{
    let k =0;
    for(k =0 ; k<9;k++)
    {
        Goal[k] = Arr[k];
        if(Arr[k] != 0)
        {
            GG.innerHTML += `
            <div class="inner-block1" id="I${k+1}">
            <h1 class="number1">${Arr[k]}</h1>
            </div>`
        }
        else
        {
            GG.innerHTML +=
            ` 
            <div class="inner-block1" id="Non-block1">
            </div>
            `;
        }
    }
    let Nodes1 = document.getElementsByClassName('inner-block1');
    Nodes1[0].style.top = "1%"; 
    Nodes1[0].style.left = "1%"; 

    Nodes1[1].style.top = "1%"; 
    Nodes1[1].style.left = "33%";

    Nodes1[2].style.top = "1%"; 
    Nodes1[2].style.left = "65%"; 

    Nodes1[3].style.top = "33%"; 
    Nodes1[3].style.left = "1%"; 

    Nodes1[4].style.top = "33%"; 
    Nodes1[4].style.left = "33%";

    Nodes1[5].style.top = "33%"; 
    Nodes1[5].style.left = "65%"; 

    Nodes1[6].style.top = "65%"; 
    Nodes1[6].style.left = "1%"; 

    Nodes1[7].style.top = "65%"; 
    Nodes1[7].style.left = "33%"; 

    Nodes1[8].style.top = "65%"; 
    Nodes1[8].style.left = "65%"; 
    inputErr.innerHTML ="";
    inputErr.style = "display:none";
    updateGoal();
    Heuristic(Node_Arr);
}
function clear()
{
    let k =0;
    for(k =0 ; k<9 ;k++)
    {

    }
}
//_________________ moves _________________
function swapXY(I1,index ,T)
{
    let tmpX ;
    let tmpY;
    let i =0;
    for(i=0;i<9;i++)
    {
        if(I1[i].value == 0)
        {
            tmpX =I1[i].X ;
            tmpY =I1[i].Y ;
            break;
        }
    }
    I1[i].X = I1[index].X;
    I1[i].Y = I1[index].Y;
    I1[index].X = tmpX;
    I1[index].Y = tmpY;
    Space_position.X = I1[i].X;
    Space_position.Y = I1[i].Y;
    
    if(T == 0)
    {
        I1[index].item.style ="left:"+ I1[index].X + "% !important ; top:" + I1[index].Y + "% !important;";
        Space_position.item.style ="left:"+ Space_position.X + "% !important ; top:" + Space_position.Y + "% !important;";
        Heuristic(I1);
    }

   
}
function moveTop(Node_Arr1 , T)
{
    var i =0;
    for(i=0;i<9;i++)
    {
        if(Space_position.Y == Node_Arr1[i].Y + deltaY  && Space_position.X == Node_Arr1[i].X )
        {
           swapXY(Node_Arr1,i,T);
            break;
        }
    }
}
function moveBottom(Node_Arr1 , T)
{
    var i =0;
    for(i=0;i<9;i++)
    {
        if(Space_position.Y == Node_Arr1[i].Y - deltaY  && Space_position.X == Node_Arr1[i].X )
        {
           swapXY(Node_Arr1,i ,T);
            break;
        }
    }
}
function moveRight(Node_Arr1 ,T)
{
    let i =0;
    for(i=0;i<9;i++)
    {
        if(Space_position.Y == Node_Arr1[i].Y  && Space_position.X == Node_Arr1[i].X - deltaX )
        {
           swapXY(Node_Arr1,i ,T);
            break;
        }
    }
}
function moveLeft(Node_Arr1 ,T)
{
    var i =0;
    for(i=0;i<9;i++)
    {
        if(Space_position.Y == Node_Arr1[i].Y  && Space_position.X == Node_Arr1[i].X + deltaX )
        {
           swapXY(Node_Arr1,i ,T);
            break;
        }
    }
}
//_________________ Heuristic _________________
function Heuristic(Node_Arr1)
{
    let heuristic = 0 ,sum=0;
    var i =0;
    for(i =0 ;i<9;i++)
    {
        let Nodes1 = document.getElementsByClassName('inner-block1');
        let j =0;
        for(j =0;j<9;j++)
        {
            if(Goal_Obj[i].value == Node_Arr1[j].value)
            {
                if(Goal_Obj[i].X == Node_Arr1[j].X && Goal_Obj[i].Y == Node_Arr1[j].Y)
                {
                    sum++;
                    Nodes1[i].style = "background-color: rgb(43, 255, 0);";
                    Nodes1[0].style.top = "1%"; 
                    Nodes1[0].style.left = "1%"; 
                
                    Nodes1[1].style.top = "1%"; 
                    Nodes1[1].style.left = "33%";
                
                    Nodes1[2].style.top = "1%"; 
                    Nodes1[2].style.left = "65%"; 
                
                    Nodes1[3].style.top = "33%"; 
                    Nodes1[3].style.left = "1%"; 
                
                    Nodes1[4].style.top = "33%"; 
                    Nodes1[4].style.left = "33%";
                
                    Nodes1[5].style.top = "33%"; 
                    Nodes1[5].style.left = "65%"; 
                
                    Nodes1[6].style.top = "65%"; 
                    Nodes1[6].style.left = "1%"; 
                
                    Nodes1[7].style.top = "65%"; 
                    Nodes1[7].style.left = "33%"; 
                
                    Nodes1[8].style.top = "65%"; 
                    Nodes1[8].style.left = "65%"; 
                }
                else
                {
                    Nodes1[i].style = "background-color: rgb(0, 0, 0);";
                    Nodes1[0].style.top = "1%"; 
                    Nodes1[0].style.left = "1%"; 
                
                    Nodes1[1].style.top = "1%"; 
                    Nodes1[1].style.left = "33%";
                
                    Nodes1[2].style.top = "1%"; 
                    Nodes1[2].style.left = "65%"; 
                
                    Nodes1[3].style.top = "33%"; 
                    Nodes1[3].style.left = "1%"; 
                
                    Nodes1[4].style.top = "33%"; 
                    Nodes1[4].style.left = "33%";
                
                    Nodes1[5].style.top = "33%"; 
                    Nodes1[5].style.left = "65%"; 
                
                    Nodes1[6].style.top = "65%"; 
                    Nodes1[6].style.left = "1%"; 
                
                    Nodes1[7].style.top = "65%"; 
                    Nodes1[7].style.left = "33%"; 
                
                    Nodes1[8].style.top = "65%"; 
                    Nodes1[8].style.left = "65%"; 
                    break;
                }
            }
        }
    }
    heuristic = 9 -sum;
    return heuristic;

}
function ManhattanDistance(Node_Arr1)
{
    let Sum =0;
    for(i =0 ; i< Goal_Obj.length ;i++)
    {
        let MD =0;
        for(var j =0; j<Node_Arr1.length;j++)
        {
            if(Goal_Obj[i].value == Node_Arr1[j].value)
            {
                MD = Math.abs(Goal_Obj[i].X - Node_Arr1[j].X) + Math.abs(Goal_Obj[i].Y - Node_Arr1[j].Y);
                Sum += MD;
                break;
            }
        }
    }
    return Sum;
}
//_________________ Greedy Algo _________________

let cost =0;
async function Greedy(Time)
{   
    let Test1 =[];
        while(true)
        {
            if(Heuristic(Node_Arr) == 0)
            {
                break;
            }
            let p3 = JSON.parse(JSON.stringify(Node_Arr));
            Greedy_old_state.push(p3);
            let i =0 ,index =0;
            for(i=0;i<9;i++)
            {
                if(Node_Arr[i].value == 0)
                {
                    index = i;
                    break;
                }
            }
            //__________________
            let moveArr = [];//LRTB
             i =0;
             for(i =0 ;i<4;i++)
            {
                moveArr[i] = 1000;
            }

            if(Node_Arr[index].X != 1)
            {
                moveLeft(Node_Arr , 1);
                moveArr[0] =  Heuristic(Node_Arr);
                for(i = 0 ; i<Greedy_old_state.length ; i++) 
                {
                    let j =0 ,count =0;
                    for(j =0 ;j<9;j++)
                    {
                        if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                        {
                            count++;
                        }
                        if(count == 9)
                        {
                            moveArr[0] = 1000;
                            break;
                        }
                    }
                }
                moveRight(Node_Arr , 1);  
            }
            if(Node_Arr[index].X != 65)
            {
                moveRight(Node_Arr ,1)
                moveArr[1] =  Heuristic(Node_Arr);
                for(i = 0 ; i<Greedy_old_state.length ; i++) 
                {
                    let j =0 ,count =0;
                    for(j =0 ;j<9;j++)
                    {
                        if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                        {
                            count++;
                        }
                        if(count == 9)
                        {
                            moveArr[1] = 1000;
                            break;
                        }
                    }
                } 
                moveLeft(Node_Arr,1);  
            }
            if(Node_Arr[index].Y != 1)
            {
                moveTop(Node_Arr , 1);
                moveArr[2] =  Heuristic(Node_Arr);
                for(i = 0 ; i<Greedy_old_state.length ; i++) 
                {
                    let j =0 ,count =0;
                    for(j =0 ;j<9;j++)
                    {
                        if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                        {
                            count++;
                        }
                        if(count == 9)
                        {
                            moveArr[2] = 1000;
                            break;
                        }
                    }
                } 
                moveBottom(Node_Arr ,1);  
            }
            if(Node_Arr[index].Y != 65)
            {
                moveBottom(Node_Arr ,1);
                moveArr[3] = Heuristic(Node_Arr);
                for(i = 0 ; i<Greedy_old_state.length ; i++) 
                {
                    let j =0 ,count =0;
                    for(j =0 ;j<9;j++)
                    {
                        if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                        {
                            count++;
                        }
                        if(count == 9)
                        {
                            moveArr[3] = 1000;
                            break;
                        }
                    }
                   
                } 
                moveTop(Node_Arr ,1) 
            }
            i=0;
            let min =1100;
            for(i =0 ; i< 4 ;i++)
            {
                if(moveArr[i] < min)
                {
                    min = moveArr[i];
                    index = i;
                }
            } 
            console.log(moveArr);
            await sleep(Time); // delay time
            if(index == 0)
            {
                moveLeft(Node_Arr,0);
               Test1.push('LEFT');
            }
            else if(index == 1)
            {
                moveRight(Node_Arr,0);
               Test1.push('RIGHT');
            }
            else if(index == 2)
            {
                moveTop(Node_Arr,0);
                Test1.push('TOP');
            }
            else
            {
                moveBottom(Node_Arr,0);
                Test1.push('BOTTOM');
            }  
            
            cost++;
            let VV =0;
            for(var s =0 ;s <4; s++)
            {
                if(moveArr[s] > 999)
                {
                    VV++;
                }
            }
            if(VV == 4)
            {
                Swal.fire({
                    icon: 'error',
                    text: 'The puzzle is not solved using Greedy',
                  })
                  break;

                }
                
            }
        if(Heuristic(Node_Arr) == 0)
        {
            Swal.fire({
                title: 'The puzzle is solved using Greedy',
                text: "show Test States",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.isConfirmed) {
                    outTest(Test1); 
                }
              })
          
    }
        End();
    }
async function GreedyMD(Time)
    {   
        let Test1 =[];
            while(true)
            {
                if(ManhattanDistance(Node_Arr) == 0)
                {
                    break;
                }
                let p3 = JSON.parse(JSON.stringify(Node_Arr));
                Greedy_old_state.push(p3);
                let i =0 ,index =0;
                for(i=0;i<9;i++)
                {
                    if(Node_Arr[i].value == 0)
                    {
                        index = i;
                        break;
                    }
                }
                //__________________
                let moveArr = [];//LRTB
                 i =0;
                 for(i =0 ;i<4;i++)
                {
                    moveArr[i] = 10000;
                }
    
                if(Node_Arr[index].X != 1)
                {
                    moveLeft(Node_Arr , 1);
                    Heuristic(Node_Arr);
                    moveArr[0] = ManhattanDistance(Node_Arr);
                    for(i = 0 ; i<Greedy_old_state.length ; i++) 
                    {
                        let j =0 ,count =0;
                        for(j =0 ;j<9;j++)
                        {
                            if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                            {
                                count++;
                            }
                            if(count == 9)
                            {
                                moveArr[0] = 10000;
                                break;
                            }
                        }
                    }
                    moveRight(Node_Arr , 1);  
                }
                if(Node_Arr[index].X != 65)
                {
                    moveRight(Node_Arr ,1)
                    Heuristic(Node_Arr);
                    moveArr[1] = ManhattanDistance(Node_Arr);
                    for(i = 0 ; i<Greedy_old_state.length ; i++) 
                    {
                        let j =0 ,count =0;
                        for(j =0 ;j<9;j++)
                        {
                            if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                            {
                                count++;
                            }
                            if(count == 9)
                            {
                                moveArr[1] = 10000;
                                break;
                            }
                        }
                    } 
                    moveLeft(Node_Arr,1);  
                }
                if(Node_Arr[index].Y != 1)
                {
                    moveTop(Node_Arr , 1);
                    Heuristic(Node_Arr);
                    moveArr[2] = ManhattanDistance(Node_Arr);
                    for(i = 0 ; i<Greedy_old_state.length ; i++) 
                    {
                        let j =0 ,count =0;
                        for(j =0 ;j<9;j++)
                        {
                            if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                            {
                                count++;
                            }
                            if(count == 9)
                            {
                                moveArr[2] = 10000;
                                break;
                            }
                        }
                    } 
                    moveBottom(Node_Arr ,1);  
                }
                if(Node_Arr[index].Y != 65)
                {
                    moveBottom(Node_Arr ,1);
                    Heuristic(Node_Arr);
                    moveArr[3] = ManhattanDistance(Node_Arr);
                    for(i = 0 ; i<Greedy_old_state.length ; i++) 
                    {
                        let j =0 ,count =0;
                        for(j =0 ;j<9;j++)
                        {
                            if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                            {
                                count++;
                            }
                            if(count == 9)
                            {
                                moveArr[3] = 10000;
                                break;
                            }
                        }
                       
                    } 
                    moveTop(Node_Arr ,1) 
                }
                i=0;
                let min =11000;
                for(i =0 ; i< 4 ;i++)
                {
                    if(moveArr[i] < min)
                    {
                        min = moveArr[i];
                        index = i;
                    }
                } 
                console.log(moveArr);
                await sleep(Time); // delay time
                if(index == 0)
                {
                    moveLeft(Node_Arr,0);
                   Test1.push('LEFT');
                }
                else if(index == 1)
                {
                    moveRight(Node_Arr,0);
                   Test1.push('RIGHT');
                }
                else if(index == 2)
                {
                    moveTop(Node_Arr,0);
                    Test1.push('TOP');
                }
                else
                {
                    moveBottom(Node_Arr,0);
                    Test1.push('BOTTOM');
                }  
                
                cost++;
                let VV =0;
                for(var s =0 ;s <4; s++)
                {
                    if(moveArr[s] >= 9999)
                    {
                        VV++;
                    }
                }
                if(VV == 4)
                {
                    Swal.fire({
                        icon: 'error',
                        text: 'The puzzle is not solved using Greedy',
                      })
                      break;
    
                    }
                    
                }
            if(ManhattanDistance(Node_Arr) == 0)
            {
                Swal.fire({
                    title: 'The puzzle is solved using Greedy',
                    text: "show Test States",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        outTest(Test1); 
                    }
                  })
              
        }
            End();
    }


function updateGoal()
{
    let i =1;
    let j =1;
    let k =0;
    for(i =1 ;i <66 ; i = i + 32)
    {
        for(j =1 ;j <66 ; j = j + 32)
        {
                Goal_Obj[k] =
                {
                    'value': Goal[k],
                     'X' : j ,
                     'Y' : i
                }
                k++;
        }
    }
}
function sleep(ms)
{
    return new Promise(resolve=>{
        setTimeout(()=>{resolve('')},ms);
    })
}
//_________________ A* _________________
async function AStar(Time)
{  
    
    let Parent =null;
    let OBJ =[];
    let Test1 =[];
    while(true)
    {
        let Node =[];
        if(Heuristic(Node_Arr) == 0)   
        {      
            alert("Done");   
            break;
        }
            let p3 = JSON.parse(JSON.stringify(Node_Arr));
            Greedy_old_state.push(p3);
            let i =0 ,index =0;
            for(i=0;i<9;i++)
            {
                if(Node_Arr[i].value == 0)
                {
                    index = i;
                    break;
                }
            }
            //__________________
            let moveArr = [];//LRTB
             i =0;
             for(i =0 ;i<4;i++)
            {
                moveArr[i] = 1000;
            }

            if(Node_Arr[index].X != 1)
            {
                moveLeft(Node_Arr , 1);
                moveArr[0] =  Heuristic(Node_Arr);
                for(i = 0 ; i<Greedy_old_state.length ; i++) 
                {
                    let j =0 ,count =0;
                    for(j =0 ;j<9;j++)
                    {
                        if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                        {
                            count++;
                        }
                        if(count == 9)
                        {
                            moveArr[0] = 1000;
                            break;
                        }
                    }
                }
                moveRight(Node_Arr , 1);  
            }
            if(Node_Arr[index].X != 65)
            {
                moveRight(Node_Arr ,1)
                moveArr[1] =  Heuristic(Node_Arr);
                for(i = 0 ; i<Greedy_old_state.length ; i++) 
                {
                    let j =0 ,count =0;
                    for(j =0 ;j<9;j++)
                    {
                        if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                        {
                            count++;
                        }
                        if(count == 9)
                        {
                            moveArr[1] = 1000;
                            break;
                        }
                    }
                } 
                moveLeft(Node_Arr,1);  
            }
            if(Node_Arr[index].Y != 1)
            {
                moveTop(Node_Arr , 1);
                moveArr[2] =  Heuristic(Node_Arr);
                for(i = 0 ; i<Greedy_old_state.length ; i++) 
                {
                    let j =0 ,count =0;
                    for(j =0 ;j<9;j++)
                    {
                        if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                        {
                            count++;
                        }
                        if(count == 9)
                        {
                            moveArr[2] = 1000;
                            break;
                        }
                    }
                } 
                moveBottom(Node_Arr ,1);  
            }
            if(Node_Arr[index].Y != 65)
            {
                moveBottom(Node_Arr ,1);
                moveArr[3] = Heuristic(Node_Arr);
                for(i = 0 ; i<Greedy_old_state.length ; i++) 
                {
                    let j =0 ,count =0;
                    for(j =0 ;j<9;j++)
                    {
                        if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                        {
                            count++;
                        }
                        if(count == 9)
                        {
                            moveArr[3] = 1000;
                            break;
                        }
                    }
                   
                } 
                moveTop(Node_Arr ,1) 
            }
            await sleep(Time); // delay time
            if(moveArr[0] != 1000)
            {
                
                moveLeft(Node_Arr,1);
                Node =
                {
                'next':Parent,
                'move' : 'L',
                'value': JSON.parse(JSON.stringify(Node_Arr)),
                'GH' : cost + Heuristic(Node_Arr),
                'visited' : 0
                }
                var p2 = JSON.parse(JSON.stringify(Node));
                OBJ.push(p2);      

                moveRight(Node_Arr,1);
            }
            if(moveArr[1] != 1000)
            {
                moveRight(Node_Arr,1);
                Node =
                {
                'next':Parent,
                'move' : 'R',
                'value': JSON.parse(JSON.stringify(Node_Arr)),
                'GH' : cost + Heuristic(Node_Arr),
                'visited' : 0
                }

                var p2 = JSON.parse(JSON.stringify(Node));
                OBJ.push(p2);      
                moveLeft(Node_Arr,1);
            }
            if(moveArr[2] != 1000)
            {
                moveTop(Node_Arr,1)
                Node =
                {
                'next':Parent,
                'move' : 'T',
                'value': JSON.parse(JSON.stringify(Node_Arr)),
                'GH' : cost + Heuristic(Node_Arr),
                'visited' : 0
                }
                var p2 = JSON.parse(JSON.stringify(Node));
                OBJ.push(p2);      

                moveBottom(Node_Arr,1);
            }
            if(moveArr[3] != 1000)
            {
                moveBottom(Node_Arr,1);
                Node =
                {
                'next':Parent,
                'move' : 'B',
                'value': JSON.parse(JSON.stringify(Node_Arr)),
                'GH' : cost + Heuristic(Node_Arr),
                'visited' : 0
                }
                var p2 = JSON.parse(JSON.stringify(Node));
                OBJ.push(p2);      
                moveTop(Node_Arr,1);
            }
            let bestBath =
            {
            'next':Parent,
            'move' : 'B',
            'value': Node_Arr,
            'GH' : 10000,
            'visited' : 0,        
        } 
        let index1 =0;
        for(var j=0;j<OBJ.length;j++)
        {
            if(OBJ[j].GH < bestBath.GH && OBJ[j].visited != 1) 
            {
                bestBath = OBJ[j];
                index1 = j;
            }
        }
        Node_Arr = bestBath.value;
        Parent = bestBath;
        OBJ[index1].visited = 1;
        cost++;
        console.log(OBJ);
        
        console.log(bestBath);
        console.log(Node_Arr);

        if(allIsVisited(OBJ))
        {
            break;
        }

    }
}
async function AStarHill()
{
    let Parent =
    {
        'move' : 'L',
        'Heuristic' :1000 
    }
    let Test1 =[];
    while(true)
    {
        if(Heuristic(Node_Arr) == 0)
        {
            break;
        }
        let p3 = JSON.parse(JSON.stringify(Node_Arr));
        Greedy_old_state.push(p3);
        let i =0 ,index =0;
        for(i=0;i<9;i++)
        {
            if(Node_Arr[i].value == 0)
            {
                index = i;
                break;
            }
        }
        //__________________
        let moveArr = [];//LRTB
         i =0;
         for(i =0 ;i<4;i++)
        {
            moveArr[i] = 1000;
        }

        if(Node_Arr[index].X != 1)
        {
            moveLeft(Node_Arr , 1);
            moveArr[0] =  Heuristic(Node_Arr);
            for(i = 0 ; i<Greedy_old_state.length ; i++) 
            {
                let j =0 ,count =0;
                for(j =0 ;j<9;j++)
                {
                    if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                    {
                        count++;
                    }
                    if(count == 9)
                    {
                        moveArr[0] = 1000;
                        break;
                    }
                }
            }
            moveRight(Node_Arr , 1);  
        }
        if(Node_Arr[index].X != 65)
        {
            moveRight(Node_Arr ,1)
            moveArr[1] =  Heuristic(Node_Arr);
            for(i = 0 ; i<Greedy_old_state.length ; i++) 
            {
                let j =0 ,count =0;
                for(j =0 ;j<9;j++)
                {
                    if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                    {
                        count++;
                    }
                    if(count == 9)
                    {
                        moveArr[1] = 1000;
                        break;
                    }
                }
            } 
            moveLeft(Node_Arr,1);  
        }
        if(Node_Arr[index].Y != 1)
        {
            moveTop(Node_Arr , 1);
            moveArr[2] =  Heuristic(Node_Arr);
            for(i = 0 ; i<Greedy_old_state.length ; i++) 
            {
                let j =0 ,count =0;
                for(j =0 ;j<9;j++)
                {
                    if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                    {
                        count++;
                    }
                    if(count == 9)
                    {
                        moveArr[2] = 1000;
                        break;
                    }
                }
            } 
            moveBottom(Node_Arr ,1);  
        }
        if(Node_Arr[index].Y != 65)
        {
            moveBottom(Node_Arr ,1);
            moveArr[3] = Heuristic(Node_Arr);
            for(i = 0 ; i<Greedy_old_state.length ; i++) 
            {
                let j =0 ,count =0;
                for(j =0 ;j<9;j++)
                {
                    if(Greedy_old_state[i][j].X == Node_Arr[j].X && Greedy_old_state[i][j].Y == Node_Arr[j].Y)
                    {
                        count++;
                    }
                    if(count == 9)
                    {
                        moveArr[3] = 1000;
                        break;
                    }
                }
               
            } 
            moveTop(Node_Arr ,1) 
        }
        i=0;
        let min =1100;
        for(i =0 ; i< 4 ;i++)
        {
            if(moveArr[i] < min)
            {
                min = moveArr[i];
                index = i;
            }
        } 
        if(min < Parent.Heuristic)
        {
        await sleep(Time); // delay time
        if(index == 0)
        {
            moveLeft(Node_Arr,0);
           Test1.push('LEFT');
           Parent.Heuristic = min;
           Parent.move = 'L';
        }
        else if(index == 1)
        {
            moveRight(Node_Arr,0);
           Test1.push('RIGHT');
           Parent.Heuristic = min;
           Parent.move = 'R';
        }
        else if(index == 2)
        {
            moveTop(Node_Arr,0);
            Test1.push('TOP');
            Parent.Heuristic = min;
            Parent.move = 'T';
        }
        else
        {
            moveBottom(Node_Arr,0);
            Test1.push('BOTTOM');
            Parent.Heuristic = min;
            Parent.move = 'B';
        }  
    }
    else
    {
        Swal.fire({
            icon: 'error',
            text: 'The puzzle is not solved using A* because Hill Climbing is not found Solition',
          });
          break;

    }
        
        cost++;
        let VV =0;
        for(var s =0 ;s <4; s++)
        {
            if(moveArr[s] > 999)
            {
                VV++;
            }
        }
        if(VV == 4)
        {
            Swal.fire({
                icon: 'error',
                text: 'The puzzle is not solved using A*',
              })
              break;

            }
            
        }
    if(Heuristic(Node_Arr) == 0)
    {
        Swal.fire({
            title: 'The puzzle is solved using A*',
            text: "show Test States",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                outTest(Test1); 
            }
          })
      
}
    End();
}
function Reset()
{
    Test =[];
    let A = [];
    for(var i =0 ;i<9 ;i++)
    {
        A[i] = Node_Arr2[i].value;
    }
    save_initData(A);
    Heuristic(Node_Arr);
}
function outTest(Arr)
{
    let Str = "";
    for(var i=0;i<Arr.length;i++)
    {
        if(Arr[i] == "LEFT")
        {
            Str += `<div class="bg-primary Test-in">${i+1} : LEFT</div>`;
        }
        else if(Arr[i] == "RIGHT")
        {
            Str += `<div class="bg-success Test-in">${i+1} : RIGHT</div>`;
        }
        else if(Arr[i] == "TOP")
        {
            Str += `<div class="bg-secondary Test-in">${i+1} : UP</div>`;
        }
        else
        {
            Str += `<div class="bg-warning Test-in">${i+1} : DOWN</div>`;
        }
    }
    const { value: formValues } = Swal.fire({
        title: 'Test States',
        confirmButtonText: 'By',
        confirmButtonColor: '#000000',
        html: Str,
       
        focusConfirm: true,
        preConfirm: () => {
            return [
            ]
        }
    })
}
function isFind(Arr1 ,Obj)
{
    for(i =0;i<Arr1.length;i++)
    {
        var count =0;
        for(var j =0 ;j<Obj.value;j++)
        {
            if(Arr1[i].value[j].X == Obj[j].X && Arr1[i].value[j].Y == Obj[j].Y)
            {
                count++;
            }
        } 
        if(count == 9)
        { 
            return true;
        }
    }
    return false;
}
function allIsVisited(Arr)
{
    var count =0;
    for(i =0 ;i<Arr.length;i++)
    {
        if(Arr[i].visited == 1)
        {
            count++;
        }
    }
    if(count == Arr.length)
    {
        return true;
    }
    else
    {
        return false;
    }
}