class XMLHttpRequestClass{
    constructor(){}
    static getDataTXT(){
        const xhr = new  XMLHttpRequest();
        xhr.open('GET','data.txt',true);
        
        xhr.onload = function(){
            if(this.status === 200){
                console.log('******* this is getDATA TXT from XMLHR ****** ');
                    console.log(this.responseText);
                     //  console.log(this.response); it's seem like this.responseText
                console.log('**********************************************');    
            }
        };
        
        xhr.send();
    }
    static getDataJSON(){
        const xhr = new  XMLHttpRequest();
        xhr.open('GET','data.json',true);
        
        xhr.onload = function(){
            if(this.status === 200){
                console.log('******* this is getDATA JSON from XMLHR ****** ');
                    console.log(this.responseText);
                    console.log(JSON.parse(this.responseText));
                  //  console.log(this.response); it's seem like this.responseText
                console.log('**********************************************');    
            }
        };
        
        xhr.send();
    }
}

class tryCallBackXHR{
    static getDataTXT(callback){
            const xhr = new XMLHttpRequest();
            xhr.open('GET','data.txt',true);
            xhr.onload = function(){
                if(this.status===200){
                    callback(null,this.response);
                }else{
                    callback('Error : '+this.status);
                }
            }

            xhr.send();
    }
    static getDataJSON(callback){
        const xhr = new XMLHttpRequest();
        xhr.open('GET','data.json',true);
        xhr.onload = function(){
            if(this.status===200){
                callback(null,JSON.parse(this.response));
            }else{
                callback('Error : '+this.status);
            }
        }

        xhr.send();
}
    static postData(data,callback){
        const xhr = new XMLHttpRequest();
        /* post and put and delete works with networking Api not local seems with local json*/
        xhr.open('POST',url,true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
            callback(null,this.response);
        }
        //this for JSON : 
        //xhr.send(JSON.stringify(data));
        xhr.send(data);
    }
    static putData(data,callback){
        const xhr = new XMLHttpRequest();
        /* post and put and delete works with networking Api not local */
        xhr.open('PUT',url,true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
            callback(null,this.response);
        }
         //this for JSON : 
        //xhr.send(JSON.stringify(data));
        xhr.send(data);
    }
    static deleteData(data,callback){
        const xhr = new XMLHttpRequest();
        /* post and put and delete works with networking Api not local */
        xhr.open('DELETE',url,true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
            if(this.status === 200) {
                callback(null,'deleted ...');
              } else {
                callback('Error: ' + this.status);
              }
           
        }
         //this for JSON : 
        //xhr.send(JSON.stringify(data));
        xhr.send(data);
    }
}

class fetchPromise{
    static getDataTXT(){
        return new Promise((resolve,reject)=>{
            fetch('data.txt')
            .then((data)=>data.text())
            .then(data=>resolve(data))
            .catch(err => reject(err));
        });
    }
    static getDataJSON(){
        return new Promise((resolve,reject)=>{
            fetch('data.json')
            .then((data)=>data.json())
            .then(data=>resolve(data))
            .catch(err => reject(err));
        });
    }
    static postData(data){
        /* library.js:125 POST http://127.0.0.1:5500/data.json
         405 (Method Not Allowed)
         not working with local json or text seems
          with put and delete  */
        return new Promise((resolve,reject)=>{
            fetch('data.json', {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
              })
              .then((data)=>data.json())
              .then(data=>resolve(data))
              .catch(err => reject(err));
        });
    }

    static putData(data,url){
       
            return new Promise((resolve, reject) => {
              fetch(url, {
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
              })
              .then(res => res.json())
              .then(data => resolve(data))
              .catch(err => reject(err));
            });
        
    }
    static deleteData(url) {
        return new Promise((resolve, reject) => {
          fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(() => resolve('Resource Deleted...'))
          .catch(err => reject(err));
        });
    }


}

class asyncAwait{
    static async getDataTXT(){
        const response = await fetch('data.txt');
        const resData = await response.text();
        return resData;
    }
    static async getDataJSON(){
        const response = await fetch('data.json');
        const resData = await response.json();
        return resData;
    }
    /* post , put ,delete not working in local  */
    static async postData(url, data) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    
        const resData = await response.json();
        return resData;
       
      }
    
     static async putData(url, data) {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        const resData = await response.json();
        return resData;
      }
    
     
     static async deleteData(url) {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        });
    
        const resData = await 'Resource Deleted...';
        return resData;
      }  
}