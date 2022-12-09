window.onscroll = function(){
    if(document.documentElement.scrollTop > 1250){
        document.querySelector('.goTop')
        .classList.add('show');
    }else{
        document.querySelector('.goTop')
        .classList.remove('show');
    }
}

document.querySelector('.goTop')
.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}); 