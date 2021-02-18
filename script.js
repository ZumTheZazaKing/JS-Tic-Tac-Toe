const grids = document.querySelectorAll('.unchecked');
const userNotifier = document.querySelector('#user');
const computerNotifier = document.querySelector('#computer');
const modal = document.querySelector('#modal');
const modalContent = modal.querySelector('#modal-content');

let playerTurn = true;

let playerFills = [];
let computerFills = [];

const winningConditions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]


];

function noticeClick(e){


    if(playerTurn){

        const grids = document.querySelectorAll('.unchecked');

        this.innerHTML = 'O';

        const index = this.getAttribute('data-cell-index');

        playerFills.push(index);

        for(var i = 0; i < winningConditions.length; i++){

            const winningNumbers = winningConditions[i];

            let number1 = winningNumbers[0];

            let number2 = winningNumbers[1];

            let number3 = winningNumbers[2];

            const playerNumbers = playerFills.join(' ');

            if(playerNumbers.includes(number1)){

                if(playerNumbers.includes(number2)){

                    if(playerNumbers.includes(number3)){

                        modal.style.display = 'block';

                        modalContent.querySelector('p').style.color = 'green';

                    }

                }

            }

        };

        playerTurn = false;

        notify();

        this.removeEventListener('click', noticeClick);

        this.classList.remove('unchecked');

        console.log(grids.length);

        if(grids.length === 1){

            modal.style.display = 'block';

            modalContent.querySelector('p').style.color = 'orange';

            modalContent.querySelector('p').innerHTML = 'A draw! That was unexpected';

        }

        setTimeout(computerChoose, 1000);

    }

}

function computerChoose(){

    const uncheckedGrids = document.querySelectorAll('.unchecked');

    const randomIndex = Math.floor(Math.random()*uncheckedGrids.length);

    const computerChoice = uncheckedGrids[randomIndex];

    computerChoice.innerHTML = 'X';

    const index = computerChoice.getAttribute('data-cell-index');

    computerFills.push(index);

    for(var i = 0; i < winningConditions.length; i++){

        const winningNumbers = winningConditions[i];

        let number1 = winningNumbers[0];

        let number2 = winningNumbers[1];

        let number3 = winningNumbers[2];

        const computerNumbers = computerFills.join(' ');

        if(computerNumbers.includes(number1)){

            if(computerNumbers.includes(number2)){

                if(computerNumbers.includes(number3)){

                    modal.style.display = 'block';

                    modalContent.querySelector('p').style.color = 'red';

                    modalContent.querySelector('p').innerHTML = 'You lost. Better luck next time';

                }

            }

        }

    };

    playerTurn = true;

    computerChoice.classList.remove('unchecked');

    computerChoice.removeEventListener('click', noticeClick);

    notify();

}


function notify(){

    if(playerTurn){

        userNotifier.style.opacity = 1;

        computerNotifier.style.opacity = 0.3;

    } else if (!playerTurn){

        computerNotifier.style.opacity = 1;

        userNotifier.style.opacity = 0.3;

    }

}

grids.forEach(grid => grid.addEventListener('click', noticeClick));


