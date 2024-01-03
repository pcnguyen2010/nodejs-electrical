function showSidebar(){
    const sideBar = document.querySelector('.sidebar')
    sideBar.style.display = 'flex'
}

function hideSidebar(){
    const sideBar = document.querySelector('.sidebar')
    sideBar.style.display = 'none'
}

const wrapper = document.querySelector('.wrapper')
const dialogLogin = document.getElementById('dialog-login');

dialogLogin.addEventListener("click",(e) =>{
    if(!wrapper.contains(e.target)){
        dialogLogin.close()
    }
});

function showLoginDialog(){
    
    dialogLogin.showModal();
}

function closeLoginDialog(){
    dialogLogin.close();
}

function showImageDialog(){
    
    dialogImage.showModal();
}

function closeImageDialog(){
    dialogImage.close();
}