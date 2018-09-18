document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e){
    const number = document.querySelector('input[type="number"]').value;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function(){
        if(this.status === 200){
            const response = JSON.parse(this.responseText);
            let list = '';
            if(response.type === 'success' && response.value.length > 1){
                response.value.forEach(function(joke){
                    list += `<li>${joke.joke}</li>`;
                });
            } else if(response.value.joke !== null){
                list = `<li>${response.value.joke}</li>`;
            } else{
                list = '<li>Something went wrong</li>';    
            }      
            document.querySelector('.jokes').innerHTML = list;
        }
    }

    xhr.onerror = function(){
        console.log("Request Error...");
    }

    xhr.send();

    e.preventDefault();
}