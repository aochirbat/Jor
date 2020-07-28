export default class Likes {
    constructor(){
        this.readDataFromLocalStorage();
        if(!this.like) this.like = [];
    }
    addLike(id,title,publisher,img, url){
        const like ={id , title , publisher , img};
        this.like.push(like);
        this.saveDataToLocalStroge();
        return like;
    }
    deleteLike(id){
        const index = this.like.findIndex(el => el.id === id);
        this.like.splice(index, 1);
        this.saveDataToLocalStroge();
    }
    isLiked(id){   
        if(this.like.findIndex(el => el.id === id) !== -1) return true;
        else return false; 
        // return this.like.findIndex(e => e.id === id) !== -1 ;
    }
    getNumberLikes(){
        return this.like.length;
    }
    saveDataToLocalStroge(){
        localStorage.setItem('likes', JSON.stringify(this.like));
    }
    readDataFromLocalStorage(){
        this.like = JSON.parse(localStorage.getItem('likes'));
    }
}