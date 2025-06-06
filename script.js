const socket=io('http://localhost:8000'); 

const form=document.getElementById('send-container');

const messageInput=document.getElementById('messageInp')

const messageContainer=document.querySelector(".container")

const messageTone = new Audio('message.mp3');
const joinTone = new Audio('join.mp3');
const leaveTone = new Audio('leave.mp3');

const append=(message,position,sound=null)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(sound){
        sound.play();
    }
}

const name=prompt("Enter your name to join");
append('You joined the chat', 'center');
socket.emit('new-user-joined',name)


form.addEventListener('submit',e=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'center',joinTone)
})

socket.on('receive',data =>{
append(`${data.name}:${data.message}`,'left',messageTone)
})

socket.on('leave',name=>{
append(`${name} left the chat`,'center',leaveTone)
})